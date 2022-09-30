/*
 * This ESP32 code is created by esp32io.com
 *
 * This ESP32 code is released in the public domain
 *
 * For more detail (instruction and wiring diagram), visit https://esp32io.com/tutorials/esp32-controls-fan
 */
 //fanpin
const int pwmPin               = 17;
const int pwmFreq              = 25000;
const int pwmChannel           = 0;
const int pwmResolution        = 8;
const int fanMaxRPM            = 5500;         // only used for showing at how many percent fan is running

// fanTacho
const int tachoPin                             = 16;
const int tachoUpdateCycle                     = 1000; // how often tacho speed shall be determined, in milliseconds
const int numberOfInterrupsInOneSingleRotation = 2;    //

// the code in setup function runs only one time when ESP32 starts
void setup() {
  // initialize digital pin A5 as an output.
   pinMode(17, OUTPUT);  
   pinMode(16, OUTPUT);
}

// the code in loop function is executed repeatedly infinitely
void loop() {
  digitalWrite(17, HIGH); // turn on fan 10 seconds
  delay(10000);
}
