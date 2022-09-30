#include <WiFi.h>    // esp32 library
#include <Arduino.h> //arduino library
#include <IOXhop_FirebaseESP32.h>         // firebase library
#include <Wire.h>
#include <Adafruit_BME280.h> // library to use BME280 sensor
#include <Adafruit_Sensor.h> // library to use BME280 sensor
#include <SPI.h>              //library display
#include <TFT_eSPI.h> // display
#include <NTPClient.h>
#include <WiFiUdp.h>

 
 
//display
TFT_eSPI tft = TFT_eSPI();

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

// Variables to save date and time
String formattedDate;
String dayStamp;
 
 
#define FIREBASE_HOST "vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app"                         // the project name address from firebase id
#define FIREBASE_AUTH "RS6INMnUCmOhlXxXmi3GmHqqm2daBRlox7P9WsCa"                    // the secret key generated from firebase
#define WIFI_SSID "Redmi88"                                          // input your home or public wifi name
#define WIFI_PASSWORD ""                                    //password of wifi ssid
                                           
                                                                   // setting PWM properties
const int freq = 5000;
const int ledChannel = 0;
const int resolution = 8;
 
//bme
Adafruit_BME280 bme;  
float temp = 28.2;
float hum = 38.5;
float pres = 1000.2;
 
String displaydata = "";
String fireStatus = "";  
String slider_value= "";
 
int led1 = 13;    
int led2 = 12;
int led3 = 14;
                                                          
void setup() {
  

  tft.begin();
  tft.fillScreen(TFT_BLACK);
  tft.setRotation(3);
 
  Serial.begin(9600);
  delay(1000);
 
  //senor bme
  if (!bme.begin(0x76)) {                           // checking if sensor is fouund
Serial.println("Could not find a valid BME280 sensor, check wiring!");
while (1);
}
 
  ledcSetup(ledChannel, freq, resolution);                                                             // attach the channel to the GPIO to be controlled
  ledcAttachPin(led3, ledChannel);
  ledcWrite(ledChannel, slider_value.toInt());
  
  pinMode(12, OUTPUT);      
  pinMode(14, OUTPUT);      
  pinMode(13, OUTPUT);       
 
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);                                      //try to connect with wifi
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
 
  Serial.println();
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP Address is : ");
  Serial.println(WiFi.localIP());                                                      //print local IP address
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);                                       // connect to firebase
  Firebase.setString("Lights/Light_1/isLight", "OFF");                                          //send initial string of led status
  Firebase.setString("Lights/Light_2/isLight","OFF");
  Firebase.setString("Reg/RegLight/value","0");
  Firebase.setString("DisplayData/value","");
  //time
  timeClient.begin();
  timeClient.setTimeOffset(3600); //GMT+1
 
}
unsigned long lastMillis = 0;
 
void loop() {
  //time 
  while(!timeClient.update()) {
    timeClient.forceUpdate();
  }
  fireStatus = Firebase.getString("Lights/Light_1/isLight");                     // get led status input from firebase
  if (fireStatus == "ON") {                         // compare the input of led status received from firebase
    Serial.println("Led Turned ON");                 
    digitalWrite(13, HIGH);  // make output led ON
  }
  else if (fireStatus == "OFF") {              // compare the input of led status received from firebase
    Serial.println("Led Turned OFF");
    digitalWrite(13, LOW);                                                         // make output led OFF
  }
  else {
    Serial.println("led1Wrong Credential! Please send ON/OFF");
  }
  fireStatus = Firebase.getString("Lights/Light_2/isLight");                     // get led status input from firebase
  if (fireStatus == "ON") {                         // compare the input of led status received from firebase
    Serial.println("Led Turned ON");                 
    digitalWrite(12, HIGH); // make output led ON
  }
  else if (fireStatus == "OFF") {              // compare the input of led status received from firebase
    Serial.println("Led Turned OFF");
    digitalWrite(12, LOW);                                                         // make output led OFF
  }
  else {
    Serial.println("led2Wrong Credential! Please send ON/OFF");
  }
    //dates
    formattedDate = timeClient.getFormattedDate();

  // Extract date
    int splitT = formattedDate.indexOf("T");
      dayStamp = formattedDate.substring(0, splitT);
      Serial.print("DATE: ");
      Serial.println(dayStamp);
      
       //reading temp,hum,pres
   temp = bme.readTemperature();
   hum = bme.readHumidity();
   pres = bme.readPressure()/100.0F;
   
  //display
  tft.setTextSize(2);
  tft.setTextColor(TFT_WHITE);
  tft.setCursor(0,0);
  tft.print("Teplota: ");
  tft.setTextColor(TFT_WHITE,TFT_BLACK);
  tft.print(temp);
  tft.print(" C"); 
  tft.setCursor(0, 20);
  tft.print("Vlhkost: ");
  tft.setTextColor(TFT_WHITE,TFT_BLACK);
  tft.print(hum);
  tft.print(" %");
  tft.setCursor(0, 40);
  tft.print("Tlak: ");
  tft.setTextColor(TFT_WHITE,TFT_BLACK);
  tft.print(pres);
  tft.print(" hPa"); 
  tft.setTextSize(2);
  tft.setCursor(0,60);
  tft.print("mess: ");
  tft.setTextColor(TFT_WHITE,TFT_BLACK);
  tft.print(displaydata);
 


  fireStatus = Firebase.getString("Lights/Light_1/isLight");                     // get led status input from firebase
  if (fireStatus == "ON") {                         // compare the input of led status received from firebase
    Serial.println("Led Turned ON");                 
    digitalWrite(13, HIGH);  // make output led ON
  }
  else if (fireStatus == "OFF") {              // compare the input of led status received from firebase
    Serial.println("Led Turned OFF");
    digitalWrite(13, LOW);                                                         // make output led OFF
  }
  else {
    Serial.println("led1Wrong Credential! Please send ON/OFF");
  }
  fireStatus = Firebase.getString("Lights/Light_2/isLight");                     // get led status input from firebase
  if (fireStatus == "ON") {                         // compare the input of led status received from firebase
    Serial.println("Led Turned ON");                 
    digitalWrite(12, HIGH); // make output led ON
  }
  else if (fireStatus == "OFF") {              // compare the input of led status received from firebase
    Serial.println("Led Turned OFF");
    digitalWrite(12, LOW);                                                         // make output led OFF
  }
  else {
    Serial.println("led2Wrong Credential! Please send ON/OFF");
  }
 
  slider_value= Firebase.getString("Reg/RegLight/value");   // get led status input from firebase                                             
      ledcWrite(ledChannel, slider_value.toInt());
      //Serial.print(slider_value); debug
   delay(15);
 
    //statusesp
        Firebase.setString("Esp/EspStatus", "ON");
   
  //logging temp for DB
    if (millis() - lastMillis > 600000) {
   lastMillis = millis();
       // String fireTemp = String(temp) + String("°C");
       String tits = String(temp)+String(dayStamp);
    Serial.print(" Temperature: ");  Serial.print(temp);  Serial.println("°C ");
    Firebase.pushString("Chart2/temp",tits);
  }
    //display from DB 
    displaydata = Firebase.getString("DisplayData/value");
    Serial.printf("%s", displaydata);
    
fireStatus = Firebase.getString("Lights/Light_1/isLight");                     // get led status input from firebase
  if (fireStatus == "ON") {                         // compare the input of led status received from firebase
    Serial.println("Led Turned ON");                 
    digitalWrite(13, HIGH);  // make output led ON
  }
  else if (fireStatus == "OFF") {              // compare the input of led status received from firebase
    Serial.println("Led Turned OFF");
    digitalWrite(13, LOW);                                                         // make output led OFF
  }
  else {
    Serial.println("led1Wrong Credential! Please send ON/OFF");
  }
  fireStatus = Firebase.getString("Lights/Light_2/isLight");                     // get led status input from firebase
  if (fireStatus == "ON") {                         // compare the input of led status received from firebase
    Serial.println("Led Turned ON");                 
    digitalWrite(12, HIGH); // make output led ON
  }
  else if (fireStatus == "OFF") {              // compare the input of led status received from firebase
    Serial.println("Led Turned OFF");
    digitalWrite(12, LOW);                                                         // make output led OFF
  }
  else {
    Serial.println("led2Wrong Credential! Please send ON/OFF");
  }
    
    //sending everything loop
    Firebase.setFloat("Chart/temperature", temp);
    Firebase.setFloat("Chart/humidity", hum);
    Firebase.setFloat("Chart/pressure", pres);
    fireStatus = Firebase.getString("Lights/Light_1/isLight");    
    
    // get led status input from firebase
  if (fireStatus == "ON") {                         // compare the input of led status received from firebase
    Serial.println("Led Turned ON");                 
    digitalWrite(13, HIGH);  // make output led ON
  }
  else if (fireStatus == "OFF") {              // compare the input of led status received from firebase
    Serial.println("Led Turned OFF");
    digitalWrite(13, LOW);                                                         // make output led OFF
  }
  else {
    Serial.println("led1Wrong Credential! Please send ON/OFF");
  }
  fireStatus = Firebase.getString("Lights/Light_2/isLight");                     // get led status input from firebase
  if (fireStatus == "ON") {                         // compare the input of led status received from firebase
    Serial.println("Led Turned ON");                 
    digitalWrite(12, HIGH); // make output led ON
  }
  else if (fireStatus == "OFF") {              // compare the input of led status received from firebase
    Serial.println("Led Turned OFF");
    digitalWrite(12, LOW);                                                         // make output led OFF
  }
  else {
    Serial.println("led2Wrong Credential! Please send ON/OFF");
  }
  } 
