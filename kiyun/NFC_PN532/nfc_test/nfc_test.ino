#include <Wire.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

#define PN532_SCK  (13)
#define PN532_MOSI (11)
#define PN532_SS   (10)
#define PN532_MISO (12)

Adafruit_PN532 nfc(PN532_SCK, PN532_MISO, PN532_MOSI, PN532_SS);

uint8_t myuid[] = {71, 87, 133, 123};

void setup() {
  Serial.begin(115200);

  nfc.begin();  
  nfc.setPassiveActivationRetries(0xFF);  
  nfc.SAMConfig();
  
  Serial.println("Waiting for an ISO14443A card");
}

void loop() {
  boolean success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };
  uint8_t uidLength;
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, &uid[0], &uidLength);
  
  if (success) {
    Serial.println("Found a card!");
    Serial.print("UID Length: ");Serial.print(uidLength, DEC);Serial.println(" bytes");
    Serial.print("UID Value: ");
    for (uint8_t i=0; i < uidLength; i++) 
    {
      Serial.print(" 0x");Serial.print(uid[i]); 
    }
    Serial.println("");
    if((myuid[0] == uid[0]) && (myuid[1] == uid[1]) && (myuid[2] == uid[2]) && (myuid[3] == uid[3])) {Serial.println("true");}
  // Wait 1 second before continuing
  delay(1000);
  }
  else
  {
    // PN532 probably timed out waiting for a card
    Serial.println("Timed out waiting for a card");
  }
}
