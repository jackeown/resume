
import math
import numpy as np
import sys

n = int(sys.argv[1])


def getColors(i):
    magnitude = 1 - math.sqrt(np.abs(i-50) / 50)
    magnitude *= 4.5
    angle = 2*math.pi * (i/100)
    rot1 = np.exp(angle * 1j)
    rot2 = np.exp((2*math.pi / 3) * 1j)

    r = magnitude * rot1
    g = magnitude * rot1 * rot2
    b = magnitude * rot1 * rot2 * rot2

    return r.real, r.imag, g.real, g.imag, b.real, b.imag


for i in np.linspace(1,99, n):
    ra,rb, ga,gb, ba,bb = getColors(i)
    print(f"""
    
     {int(i)}% {{
      text-shadow:{ra:.2f}px {rb:.2f}px 1px red,
                    {ga:.2f}px {gb:.2f}px 1px green,
                    {ba:.2f}px {bb:.2f}px 1px blue; 
     }} 
    
    """)