#include <string.h>
#include <sstream>
#include "ros/ros.h"
#include "serving_robot/ServiceStatus.h"
#include "std_msgs/Bool.h"
#include "std_msgs/String.h"
#include "actionlib_msgs/GoalStatusArray.h"
#include "move_base_msgs/MoveBaseActionResult.h"
#include "geometry_msgs/PoseStamped.h"

#define TURTLEBOT 0
#define TABLE_ONE 1
#define TABLE_TWO 2
#define TABLE_THREE 3

class ServiceCore
{
private:
    ros::NodeHandle nh;
    // Pulisher
    ros::Publisher pubPoseStampedTb3p;
    // Subscriber
    ros::Subscriber sub_arrival_status_tb3p;
    ros::Subscriber sub_switch_state;

    // msgs
    geometry_msgs::PoseStamped poseStampedTable[4];

    std::vector<double> target_pose_position;
    std::vector<double> target_pose_orientation;

    int robot_service_sequence = 0;

    bool is_robot_reached_target[3] = {true, true, true};

public:
    ServiceCore()
    {
        fnInitParam();

        pubPoseStampedTb3p = nh.advertise<geometry_msgs::PoseStamped>("/move_base_simple/goal", 1);

        sub_arrival_status_tb3p = nh.subscribe("/move_base/result", 1, &ServiceCore::cbCheckArrivalStatusTB3P, this);

        sub_switch_state = nh.subscribe("/switch_state", 1, &ServiceCore::CheckSwitchState, this);

        ros::Rate loop_rate(5);

        while (ros::ok()) {
            fnPubPose();
            
            ros::spinOnce();

            loop_rate.sleep();
        }
    }

    void fnInitParam() {

        nh.getParam("table_pose_tb3p/position", target_pose_position);
        nh.getParam("table_pose_tb3p/orientation", target_pose_orientation);

        poseStampedTable[0].header.frame_id = "map";
        poseStampedTable[0].header.stamp = ros::Time::now();

        poseStampedTable[0].pose.position.x = target_pose_position[0];
        poseStampedTable[0].pose.position.y = target_pose_position[1];
        poseStampedTable[0].pose.position.z = target_pose_position[2];

        poseStampedTable[0].pose.orientation.x = target_pose_orientation[0];
        poseStampedTable[0].pose.orientation.y = target_pose_orientation[1];
        poseStampedTable[0].pose.orientation.z = target_pose_orientation[2];
        poseStampedTable[0].pose.orientation.w = target_pose_orientation[3];


        nh.getParam("table_pose_one/position", target_pose_position);
        nh.getParam("table_pose_one/orientation", target_pose_orientation);

        poseStampedTable[1].header.frame_id = "map";
        poseStampedTable[1].header.stamp = ros::Time::now();

        poseStampedTable[1].pose.position.x = target_pose_position[0];
        poseStampedTable[1].pose.position.y = target_pose_position[1];
        poseStampedTable[1].pose.position.z = target_pose_position[2];

        poseStampedTable[1].pose.orientation.x = target_pose_orientation[0];
        poseStampedTable[1].pose.orientation.y = target_pose_orientation[1];
        poseStampedTable[1].pose.orientation.z = target_pose_orientation[2];
        poseStampedTable[1].pose.orientation.w = target_pose_orientation[3];


        nh.getParam("table_pose_two/position", target_pose_position);
        nh.getParam("table_pose_two/orientation", target_pose_orientation);

        poseStampedTable[2].header.frame_id = "map";
        poseStampedTable[2].header.stamp = ros::Time::now();

        poseStampedTable[2].pose.position.x = target_pose_position[0];
        poseStampedTable[2].pose.position.y = target_pose_position[1];
        poseStampedTable[2].pose.position.z = target_pose_position[2];

        poseStampedTable[2].pose.orientation.x = target_pose_orientation[0];
        poseStampedTable[2].pose.orientation.y = target_pose_orientation[1];
        poseStampedTable[2].pose.orientation.z = target_pose_orientation[2];
        poseStampedTable[2].pose.orientation.w = target_pose_orientation[3];


        nh.getParam("table_pose_three/position", target_pose_position);
        nh.getParam("table_pose_three/orientation", target_pose_orientation);

        poseStampedTable[3].header.frame_id = "map";
        poseStampedTable[3].header.stamp = ros::Time::now();

        poseStampedTable[3].pose.position.x = target_pose_position[0];
        poseStampedTable[3].pose.position.y = target_pose_position[1];
        poseStampedTable[3].pose.position.z = target_pose_position[2];

        poseStampedTable[3].pose.orientation.x = target_pose_orientation[0];
        poseStampedTable[3].pose.orientation.y = target_pose_orientation[1];
        poseStampedTable[3].pose.orientation.z = target_pose_orientation[2];
        poseStampedTable[3].pose.orientation.w = target_pose_orientation[3];
    }

    void CheckSwitchState(const std_msgs::Bool::ConstPtr& msg) {
        if (msg->data == true) {
            robot_service_sequence = 1;
        }
        else {

        }
    }
    
    void cbCheckArrivalStatusTB3P(const move_base_msgs::MoveBaseActionResult rcvMoveBaseActionResult) {
        if (rcvMoveBaseActionResult.status.status == 3) {
            is_robot_reached_target[TURTLEBOT] = true;
        } else {
            ROS_INFO("cbCheckArrivalStatusTB3P : %d", rcvMoveBaseActionResult.status.status);
        }
    }
    
    void fnPubPose() {
        
        if (is_robot_reached_target[TURTLEBOT]) {
            if (robot_service_sequence == 1) {
                
                // start message
                ROS_INFO("start");
                
                robot_service_sequence = 2;
            } else if (robot_service_sequence == 2) {
                
                // go to table
                pubPoseStampedTb3p.publish(poseStampedTable[TABLE_ONE]);
                
                is_robot_reached_target[TURTLEBOT] = false;
                
                robot_service_sequence = 3;
                
            } else if (robot_service_sequence == 3) {
                
                // arrived table
                ROS_INFO("arrived");
                
                pubPoseStampedTb3p.publish(poseStampedTable[TABLE_TWO]);
                
                robot_service_sequence = 4;
                
            } else if (robot_service_sequence == 4) {
                
                // return to table
                pubPoseStampedTb3p.publish(poseStampedTable[TABLE_THREE]);

                is_robot_reached_target[TURTLEBOT] = false;
                
                robot_service_sequence = 5;
                
            } else if (robot_service_sequence == 5) {
                
                // finish
                ROS_INFO("finish");
                
                robot_service_sequence = 0;
                
                ROS_INFO("ended");
                
            }
        }
    }
};


int main(int argc, char** argv) {

    ros::init(argc, argv, "service_core");
    
    ServiceCore serviceCore;
    
    ros::spin();
    
    return 0;

}
