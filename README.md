# node-live-stream
A node application to stream live video from an IP camera to your browser. This project uses [ffmpeg](https://www.ffmpeg.org/) and your computers webcam to stream live video to ```http:localhost:8888/video``` at ~30 FPS. The ffmpeg command that I used is included in ```commands.txt```. 
####Getting Started
######Open a terminal window and clone down this repo
```
$ git clone https://github.com/samheutmaker/node-live-stream.git
$ cd node-live-stream
```

You must have your server started before you begin streaming the video.
```
$ node node-live-stream
```
This will start a server that listens for video in at ```http:localhost:8888/videoin``` and displays the video at ```http:localhost:8888/video```

####ffmpeg
To start streaming video, copy the command in ```commands.txt``` and paste in it into a new terminal window.
```
$ ffmpeg -f avfoundation -framerate 30 -i "0:0" -tune zerolatency -b 5000k -f mjpeg http://127.0.0.1:8888/videoin
```
This will start ffmpeg streaming video to your server. You will most likely see some sort of indicating that your webcam is filming.

####Viewing you streamed content
Open up ```http:localhost:8888/video``` and you should see a your video displayed.

####Notes
I tried to use this solution with a hosted server and did not get decent results. If you are able to get it working, feel free to make pull requst.







