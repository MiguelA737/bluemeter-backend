#define BLYNK_PRINT Serial      // Biblioteca para utilização do Blynk
#include <ESP8266WiFi.h>        // Biblioteca para utilização do NodeMCU
#include <BlynkSimpleEsp8266.h> // Biblioteca comunicação entre NodeMCU e Blynk

#define SENSOR D2               // definimos a entrada digital D2 para receber a leitura dos pulsos do sensor de vazão

// Parâmetros necessários para conexão NodeMCU e Blynk via Wifi
char auth[] = "Blynk-Token"; 
char ssid[] = "Endereço-Wifi"; 
char pass[] = "Senha-Wifi"; 

// Declarando as variáveis 
long tempoAtual = 0;
long tempoAnterior = 0;
int intervalo = 1000;
float fatorCalibracao = 11.15;   // valor empírico utilizado no cálculo da conversão de pulsos em vazão
volatile byte contadorPulso;
byte pulso1seg = 0;
float vazao;
unsigned int vazaoMililitros;
unsigned long totalMililitros;
float tarifa;                   

BLYNK_WRITE(V1) {

  /*
  Função Reset - acionado o botão ligado ao pino vitual V1 no blynk, o sistema é reiniciado, limpando os dados anteriores
  */
 
  int resetaDados = param.asInt();
  
  if (resetaDados == 0) {
    Serial.println("Limpando dados");
    Blynk.virtualWrite(V2, 0);
    Blynk.virtualWrite(V3, 0);
    Blynk.virtualWrite(V4, 0);
    vazao = 0;
    vazaoMililitros = 0;
    totalMililitros = 0;
  }
}
 
void IRAM_ATTR contaPulso(){

  /* 
  Função que contabiliza os pulsos gerados pela passagem de água no sensor de fluxo (Efeito Hall), estes serão armazenados
  em uma varíavel e utulizados para o cálculo da vazão
  */
  
  contadorPulso++;
  
}

void setup(){
  
  Serial.begin(115200);             // iniciamos o monitor serial para vizualização dos dados pela própria interface do Arduino IDE

  Blynk.begin(auth, ssid, pass);    // estabelecemos uma conexão com o servidor do Blynk

  pinMode(SENSOR, INPUT_PULLUP);    // estabelecemos o sensor como uma entrada digital

  // Determinamos os valores inciais das variáveis
  contadorPulso = 0;
  vazao = 0.0;
  vazaoMililitros = 0;
  totalMililitros = 0;
  tempoAnterior = 0;
  tarifa = 0.0022;                  // definimos um valor arbitrário a fim de compor a funcionalidade de monitoramento financeiro

  
  attachInterrupt(digitalPinToInterrupt(SENSOR), contaPulso, FALLING); 
  
  /*
  Função de interrupção - toda vez que a entrada SENSOR(D2) receber uma variação "falling", ou seja, o valor neste pino sai do nível lógico 1 para 0 
  (ou de 5 até 0 Volts), a sequência do programa é interrompida, chamando a função contaPulso
  */
}

void loop(){
  
  tempoAtual = millis();                          // recebe o número de milissegundos passados desde que a placa começou a executar o programa 

  if (tempoAtual - tempoAnterior > intervalo) {   // quando o tempo atinge um valor um pouco maior que o estipulado pelo intervalo (1000 milisseg = 1 seg), realizamos os cálculos com a quantidade de pulsos lidos
    
    pulso1seg = contadorPulso;                    // alocamos o valor de pulsos lidos nesse 1 seg em uma variável
    contadorPulso = 0;                            // zeramos o contador para a próxima medição
    vazao = ((1000.0 / (millis() - tempoAnterior)) * pulso1seg) / fatorCalibracao;   // calculamos a vazao em (L/min) com base no tempo, qtdd de pulsos e o fator de calibração
    tempoAnterior = millis();                     // substituimos o valor do tempo anterior para a próxima medição
    vazaoMililitros = (vazao / 60) * 1000;        // convertemos a vazão de L/min para mL/seg
    totalMililitros += vazaoMililitros;           // incrementamos o total de volume em mililitros com a vazao lida em 1 seg, que representa exatamente a qtdd de água que passou pelo sensor no intervalo que adotamos


    // Imprimimos os valores de calculados no Monitor Serial
    Serial.print("Vazao: ");
    Serial.print(vazao);
    Serial.print("L/min");
    Serial.print("\t");
    Serial.print("Volume total: ");
    Serial.print(totalMililitros);
    Serial.print("mL / ");
    Serial.print(totalMililitros / 1000);
    Serial.println("L");

    // Enviamos os dados para o Blynk
    Blynk.virtualWrite(V2, vazao);
    Blynk.virtualWrite(V3, totalMililitros * tarifa);
    Blynk.virtualWrite(V4, totalMililitros);
    Blynk.run();
  }
}
