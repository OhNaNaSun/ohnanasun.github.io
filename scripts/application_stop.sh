#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
kill -9 $(lsof -t -i:3000)
