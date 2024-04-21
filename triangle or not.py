# these there inputs takes the lengths of the sides of a triangle you are trying to make:
x1 = int((input("What is the first side length?: \n")))
x2 = int((input("What is the second side length?: \n")))
x3 = int(input("What is the third side length?: \n"))

# function func() takes 3 parameters a b and c, the a is associated with x1 and b with x2, etc...


def func(a, b, c):
    # for any triangle, the sum of the lengths of any two sides must be greater than the length of the remaining side.
    # so here, we code 3 condition for the sides lengths to make a triangle
    if a + b > c:
        if a + c > b:
            if c + b > a:
                print(" okay, this looks like the sides of a triangle!!")
    else:
        print("you can not make a triangle using the sides lengths you enter")
        return


func(x1, x2, x3)
