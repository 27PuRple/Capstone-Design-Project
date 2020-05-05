#include <ros.h>
#include <std_msgs/String.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9

#define UID_0 0x47
#define UID_1 0x57
#define UID_2 0x85
#define UID_3 0x7B

ros::NodeHandle nh;

std_msgs::String str_msg;
ros::Publisher pub_test("test_pub", &str_msg);

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  SPI.begin();
  rfid.PCD_Init();
  nh.initNode();
  nh.advertise(pub_test);
}

void loop() {  
  if ( ! rfid.PICC_IsNewCardPresent() || ! rfid.PICC_ReadCardSerial() )
    return;
    
  if (rfid.uid.uidByte[0] == UID_0 && 
    rfid.uid.uidByte[1] == UID_1 && 
    rfid.uid.uidByte[2] == UID_2 && 
    rfid.uid.uidByte[3] == UID_3 ) {
      str_msg.data = "Hi";
      pub_test.publish(&str_msg);
  } else {
    digitalWrite(13, HIGH);
  }
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
  
  nh.spinOnce();
}
