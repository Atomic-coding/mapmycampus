#include <graphics.h>
#include <iostream>
#include <math.h>
// ---------------- DDA with Styles ----------------
void DDA(int x0, int y0, int x1, int y1, std::string style) {
int dx = x1 - x0;
int dy = y1 - y0;
int steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
float Xinc = dx / (float)steps;
float Yinc = dy / (float)steps;
float X = x0;
float Y = y0;
for (int i = 0; i <= steps; i++) {
if (style == "dotted") {
if (i % 3 == 0) putpixel(round(X), round(Y), WHITE);
} else if (style == "thick") {
// Draw the line thicker by plotting neighbors
putpixel(round(X), round(Y), WHITE);
putpixel(round(X)+1, round(Y), WHITE);
putpixel(round(X), round(Y)+1, WHITE);
} else {
putpixel(round(X), round(Y), WHITE);
}
X += Xinc;
Y += Yinc;
}
}
// ---------------- Bresenham with Styles ----------------
void Bresenham(int x0, int y0, int x1, int y1, std::string style) {
int dx = abs(x1 - x0);
int dy = abs(y1 - y0);
int x = x0, y = y0;
int p;
if (dx >= dy) { // Gentle slope
p = 2 * dy - dx;
int xend, yend;
if (x0 > x1) {
x = x1; y = y1;
xend = x0; yend = y0;
} else {
x = x0; y = y0;
xend = x1; yend = y1;
}
int count = 0;
while (x <= xend) {
bool draw = true;
if (style == "dashed") {
// Draw 5 pixels, skip 3 pixels
if (count % 8 >= 5) draw = false;
}
if (draw) putpixel(x, y, WHITE);
x++;
if (p < 0) {
p += 2 * dy;
} else {
if (y0 < y1) y++; else y--;
p += 2 * (dy - dx);
}
count++;
}
} else { // Steep slope
p = 2 * dx - dy;
int xend, yend;
if (y0 > y1) {
x = x1; y = y1;
xend = x0; yend = y0;
} else {
x = x0; y = y0;
xend = x1; yend = y1;
}
int count = 0;
while (y <= yend) {
bool draw = true;
if (style == "dashed") {
if (count % 8 >= 5) draw = false;
}
if (draw) putpixel(x, y, WHITE);
y++;
if (p < 0) {
p += 2 * dx;
} else {
if (x0 < x1) x++; else x--;
p += 2 * (dx - dy);
}
count++;
}
}
}
// ---------------- Main ----------------
int main() {
int gd = DETECT, gm;
initgraph(&gd, &gm, NULL);
// Outer rectangle - DDA (Dotted)
int x1 = 100, y1 = 100;
int x2 = 400, y2 = 300;
DDA(x1, y1, x2, y1, "dotted");
DDA(x2, y1, x2, y2, "dotted");
DDA(x2, y2, x1, y2, "dotted");
DDA(x1, y2, x1, y1, "dotted");
// Inner rectangle - DDA (Thick)
int ix1 = 180, iy1 = 150;
int ix2 = 320, iy2 = 250;
DDA(ix1, iy1, ix2, iy1, "thick");
DDA(ix2, iy1, ix2, iy2, "thick");
DDA(ix2, iy2, ix1, iy2, "thick");
DDA(ix1, iy2, ix1, iy1, "thick");
// Diamond - Bresenham (Dashed + Solid)
int cx = (x1 + x2) / 2;
int cy = (y1 + y2) / 2;
int topX = cx, topY = y1;
int rightX = x2, rightY = cy;
int bottomX = cx, bottomY = y2;
int leftX = x1, leftY = cy;
// Top-right (Dashed)
Bresenham(topX, topY, rightX, rightY, "dashed");
// Right-bottom (Solid)
Bresenham(rightX, rightY, bottomX, bottomY, "solid");
// Bottom-left (Dashed)
Bresenham(bottomX, bottomY, leftX, leftY, "dashed");
// Left-top (Solid)
Bresenham(leftX, leftY, topX, topY, "solid");
getch();
closegraph();
return 0;
}
