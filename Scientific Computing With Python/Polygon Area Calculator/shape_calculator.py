class Rectangle:
  def __init__(self, width, height):
    self.set_width(width)
    self.set_height(height)

  def __str__(self):
    width = str(self.width)
    height = str(self.height)
    return "Rectangle(width=" + width + ", height=" + height + ")"

  def set_width(self, width):
    self.width = width

  def set_height(self, height):
    self.height = height

  def get_area(self):
    return self.width * self.height

  def get_perimeter(self):      
    return self.width * 2 + self.height * 2

  def get_diagonal(self):
    return (self.width ** 2 + self.height ** 2) ** .5

  def get_picture(self):
    if self.width > 50 or self.height > 50:
      return "Too big for picture."
      
    lines = []
    start = 0
    string = "".rjust(self.width, "*") + "\n"
    
    while self.height > start:
      lines.append(string)
      start += 1

    return "".join(lines)

  def get_amount_inside(self, shape):
    height = self.height
    width = self.width
    amount_width = width // shape.width
    amount_height = height // shape.height
    
    return amount_width * amount_height   
        
class Square(Rectangle):
  def __init__(self, side):
    self.set_side(side)

  def __str__(self):
    side = str(self.width)
    return "Square(side=" + side + ")"

  def set_side(self, side):
    self.width = side
    self.height = side

  def set_width(self, width):
    self.set_side(width)

  def set_height(self, height):
    self.set_side(height)