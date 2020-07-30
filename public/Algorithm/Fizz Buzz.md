## Description

> Write a program that outputs the string representation of numbers from 1 to n.
> But for multiples of three it should output “Fizz” instead of the number and for the multiples of five output “Buzz”. For numbers which are multiples of both three and five output “FizzBuzz”.

## Solutions

### Solution 1: why are you so normal

```
var fizzBuzz = function(n) {
	var arr = [];
	for (var i = 1; i <= n; i++) {
		var item;
		if (i % 15 === 0) {
			item = "FizzBuzz";
		} else if (i % 3 === 0) {
			item = "Fizz";
		} else if (i % 5 === 0) {
			item = "Buzz";
		} else {
			item = String(i);
		}
		arr.push(item);
	}
	return arr;
};
```

OR

```
var fizzBuzz = function(n) {
	var arr = [];
	for (var i = 1; i <= n; i++) {
		var item = '';
		if (i % 3 === 0) {
			item += "Fizz";
		}
                if (i % 5 === 0) {
			item += "Buzz";
		}
                if(!item) {
			item = String(i);
		}
		arr.push(item);
	}
	return arr;
}
```

### Solution 2: Sometimes naive

```
var fizzBuzz = function(n) {
	let arr = [];
        const dict = {
            3: 'Fizz',
            5: 'Buzz',
           15: 'FizzBuzz'
        }
	for (let i = 1; i <= n; i++) {
		let item = String(i);
                for(let j in dict){
                     if( i % j === 0){
                         item = dict[j];
                     }
                 }
	         arr.push(item);
	}
	return arr;
};
```

OR

```
var fizzBuzz = function(n) {
	let arr = [];
        const dict = {
            3: 'Fizz',
            5: 'Buzz'
        }
	for (let i = 1; i <= n; i++) {
		let item = '';
                for(let j in dict){
                    if( i % j === 0){
                        item += dict[j];
                     }
                 }
		arr.push(item||String(i));
	}
	return arr;
};
```

### Solution 3: Familiar with Array.from?

```
var fizzBuzz = function(n) {
    const dict = {
        3: 'Fizz',
        5: 'Buzz'
    }
    return Array.from({length:n}, (v,oi)=>{
        const i = oi+1;
        let item = '';
        for(let j in dict){
            if( i % j === 0){
                item += dict[j];
            }
        }
        return item || String(i)
     })
};
```

### Solution 4: Make life simple

```
const fizzBuzz = n => Array.from({ length: n }, (_, i) => ((i+1)%3?"":"Fizz")+((i+1)%5?"":"Buzz") || (i+1)+"")
```
