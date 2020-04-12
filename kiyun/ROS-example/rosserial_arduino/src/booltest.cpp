#include "ros/ros.h"
#include "std_msgs/Bool.h"
#include <iostream>

void boolcallback(const std_msgs::Bool::ConstPtr& msg) {
  ROS_INFO("Received : [%s]", msg->data ? "true" : "false");
}

int main(int argc, char** argv) {
  
  ros::init(argc, argv, "booltest");
  
  ros::NodeHandle nh;
  ros::Subscriber sub = nh.subscribe("/pushed", 1000, boolcallback);
  
  ros::spin();
  
  return 0;
}
