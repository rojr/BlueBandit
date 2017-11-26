#!/usr/bin/env python

import time
import sys
try:
    import unicornhat as unicorn
    print("unicorn hat hd detected")
except ImportError:
    from unicorn_hat_sim import unicornhat as unicorn
import json

file = sys.argv[1];

def follow(thefile):
    thefile.seek(0,2)
    while True:
        line = thefile.readline()
        if not line:
            time.sleep(0.015)
            continue
        yield line

#unicorn.set_layout(unicorn.HAT)
unicorn.rotation(90)
unicorn.brightness(0.5)
width,height=unicorn.get_shape()

def step(picture):
    for h in range(height):
        for w in range(width):
            chr = picture[h][w]
            unicorn.set_pixel(w, h, chr[0], chr[1], chr[2])
    unicorn.show()

# Example use
# Note : This example requires the use of an apache log simulator.
#
# Go to the directory run/foo and run the program 'logsim.py' from
# that directory.   Run this program as a background process and
# leave it running in a separate window.  We'll write program
# that read the output file being generated
#

if __name__ == '__main__':
    logfile = open(file,"r")
    loglines = follow(logfile)
    for line in loglines:
        try:
            step(json.loads(line))
        except ValueError:
            print 'Error hmm';
