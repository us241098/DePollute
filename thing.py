#!/usr/bin/env python
__author__ = 'skunda'

import httplib, urllib
import time
import csv

def iot():
    with open('./Processing-CSV/Sensor_CSV/data/data.csv') as File:
        reader = csv.reader(File)
        for row in reader:
            time.sleep(10)
            rd=row[1]
            got_something = rd
            params = urllib.urlencode({'field1': got_something,'field2': 's', 'key':'3KJ5FPFM7C898A16' })
            headers = {"Content-typZZe": "application/x-www-form-urlencoded","Accept": "text/plain"}
            conn = httplib.HTTPConnection("api.thingspeak.com:80")
            try:
                conn.request("POST", "/update", params, headers)
                response = conn.getresponse()
                print got_something
                print response.status, response.reason
                data = response.read()
                conn.close()
            except:
                print "connection failed"


#sleep for desired amount of time
if __name__ == "__main__":
        while True:
                iot()
