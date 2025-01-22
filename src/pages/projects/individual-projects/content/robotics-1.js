var r1Body = "This project spanned the entirety of the semester, and required us to present a few topics we learned in class, plus a task of our choice. We worked with a Yahboom Dofbot Jetson Nano, programming with Yahboom's Python API in JupyterLab. I did the coding for our group, working with OpenCV and NumPy to implement forward and inverse kinematics, path following, and our choice task."
var r1Body2 = "Pictures from our implementation of forward and inverse kinematics"
var r1Body3 = "Forward kinematics is a means of computing the position and rotation of the end effector from the angles of each joint, the axes they rotate about, and the lengths of the links between them. Inverse kinematics does the opposite; it computes the joint configuration given the position and orientation of the end effector."
var r1Body4 = "→ A MATLAB simulation from our path following code. Without specific instruction, the arm won't always move smoothly. Path following moves each joint simultaneously to avoid unexpected paths and collisions."
var r1Body5 = "Our choice task was to use the onboard camera to locate 4 colored blocks, identify their locations and colors, and then stack them in a specified order by color. The task was split into three problems: 1. identify the colors and locations of the blocks; 2. convert those locations into joint configurations; and 3. grab the blocks and stack them. We really did give the presentation with the title Squares on Squares on Squares."
var r1Body6 = "The approach for this was based off some code provided by the the company that built the robot. Their repo had a program that basically selected the brightest pixel out of the center of the image and compared it to some preset HSV values. I modified it to read every fourth pixel, classify its color, and store the lists of pixels. It then simply averaged the lists to get a rough center for each block. Not the most advanced algorithm, but good enough for our purposes. I considered taking a bunch of pictures, labeling them manually, and using machine learning to get a better algorithm, but there was only so much time."
var r1Body7 = "It worked pretty well on a white background (top left) but those tables turned out to be the bane of our color detection code. They were the perfect hue to throw off the algorithm. The image on the top right is an early test, with the dots all over the place. The image below that is what the algorithim sees, every eigth pixel (later every fourth to get a more accurate location). It started actually working when I switched from HSV to BGR. I spent a few hours in the lab one day fiddling with the thresholds, and eventually it got accurate enough to consistently find the rough center of each block"
var r1Body8 = "From there, it was a little easier. We used some basic trigonometry to get coordinates from the camera to the block, and then inverse kinematics to get joint configurations to grab the blocks. And then it just put them on top of one another."

export { r1Body, r1Body2, r1Body3, r1Body4, r1Body5, r1Body6, r1Body7, r1Body8 }