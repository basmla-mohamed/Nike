/*------------------------------------------------------------------Notes--------------------------------------------------------------------*/
/*
NOTES:
1-getAttribute("src") gives me the src value I typed in HTML
   - "images/first-logo.png"

2-.src gives me the full URL
   - "file:///D:/frontend_myDesigns/Nike/images/first-logo.png"

3-If I want to deal with a String
   -I can convert it into an Array firstly

4-split() cuts a String from breakpoint and returns an Array.

   Example:
   "images/first-logo.png".split("/")

   Result:
   ["images", "first-logo.png"]

5-after we treat with array we must return arr to string such he can in first 
    -by join('/')

6-from the place we split(cut) we must joni(paste)

7- ?? (Null Coalescing )
   - If the value on the left is null or undefined,
     use the value on the right.

8- dataset
   Used to get data-* attributes from HTML.

   -Example:
   HTML
   data-color-name="red"

   JavaScript:
   newSlide.dataset.colorName

   Result:
   "red"

9- arr.length
    -Gives me the number of elements in the Array

    Example
    ["images", "logo.png"].length

    Result
    2

10- arr.length - 1
    Gives me the index of the last element مهمة

    Example:
    ["images", "logo.png"]

    length = 2
    last index = 2 - 1 = 1

    arr[arr.length - 1] → "logo.png"

11-change image to another that by src
    -finally after change src we must
        -Set the new src: such   image.setAttribute("src", newSrc);

12-We must stop the Automatic work of scrolling to control in the scroll
  -by e.preventDefault();

13-clientHeight => height of any Thing

14-offset => give me the height between the start of Website

15-we have a problem it's when i refresh the nav still have a opacity

16-i want to know the start and end of mySection to make when i enter to any section move the active to it

17-in a fixed nav we must put padding top to the first section after nav to dont mix it

18- length-1 => mean the last item in array

19- the roadMap html , css , responsive , javaScript .

20-we dont select featured and latest in index.js because we select them as a variables in shoes.js

21-  += in innerHTML mean add to html but = mean remove html code and add.....

22- the number of sections = the number of objects in data we get 

23- ${prepareImagesList(product.images)}    mean give me all images in product

24-stopFormatting => setting    formatOnSave

25-${product.price - (product.price *(product.discount))} 
    -mainPrice - (mainPrice * discount)

26- forEach used to loop through array
    -example
latest.forEach(function (product) {
console.log(product.name);

27- backticks and ${} insert a value into HTML
such:
`<h2>${product.name}</h2>`

28- product.discount > 0 ? "Discount available" : "No discount"
(condition) ? "true" , "false" ;

29- innerHTML replaces old content but innerHTML += adds new content to old

30- when i insert a variable by ${} we must but it in class
      -explain:
        <p class="sale" ><span class=' ${(product.discount == 0) ? "d-none" : ""} ' > -${product.discount * 100}% </span></p>   true
        <p class="sale" ><span ${(product.discount == 0) ? "d-none" : ""} > -${product.discount * 100}% </span></p>             false

31-we musnt write bacteck in the backtect of innerHTML

32-onclick can take more than 1 function and it take pure javaScrip

33- any submit or reset button to work must typed in form tag 

34-function openPopup(popupName) => mean in javascript i will send popupName
but i html when i type  onclick="openPopup('shopping')" i dont type popupName but the value must type


35-we have 3 sections in website although we type one because in data in shoes have 3 objects in shoes.js

36- in innerHTML += add to the content
= mean change the content

37-closest(selector)
find the nearest selector matching a selector i typed,
Example: that.closest(".product") => gets the parent .product div from any child element clicked on it

38-CSS Variables
Defined in CSS like     --main-color: red;
Read in JS              getComputedStyle(html).getPropertyValue("--main-color")
Change in JS            html.style.setProperty("--main-color", newColor)

39-querySelectorAll() returns NodeList not Array
nodeList like as the array but is'nt array and it dont have all charactaristics of array

40-Array.filter()[0] and Array.find()
  filter() returns an Array of all elements matches so we take [0] to get one item
  find() returns the object directly (not need to [0])

41-addEventListener VS onclick
  onclick => second one overwrite the first
   btn.onclick = function() { console.log("First"); };
   btn.onclick = function() { console.log("Second"); };
      result: Second (First is removed)

  addEventListener => all of them run
   btn.addEventListener("click", function() { console.log("First"); });
   btn.addEventListener("click", function() { console.log("Second"); });
  Result: (first and second)

42-put multiple arguments in onclick(more than 1 function i can call back them when i onclick but i must put ; at the end of each one)
  onclick="fn1(); fn2(); fn3()" all of them run when i onclick
  Example: onclick="openPopup('product'); closePopup('product'); showProduct(${product.id})"

*/
