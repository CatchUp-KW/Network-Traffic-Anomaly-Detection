#!/bin/bash

sudo apt-get update
sudo apt install openjdk-8-jdk maven
sudo apt install git
sudo apt install gradle
sudo apt-get install libpcap-dev

git clone https://github.com/ahlashkari/CICFlowMeter.git

cd CICFlowMeter
gradle clean
gradle build

cd /home/garden/CICFlowMeter/jnetpcap/linux/jnetpcap-1.4.r1425
mvn install:install-file -Dfile=./jnetpcap.jar -DgroupId=org.jnetpcap -DartifactId=jnetpcap -Dversion=1.4.1 -Dpackaging=jar

cd /home/garden/CICFlowMeter/build/distributions
sudo tar -xvf CICFlowMeter-4.0.tar
cd ./CICFlowMeter-4.0/bin

./CICFlowMeter
./cfm "/home/garden/CIC/pcap" "/home/garden/CIC/csv"
