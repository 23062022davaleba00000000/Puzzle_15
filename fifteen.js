

"use strict";//

// გლობალური ცვლადები. 
let gamePiece;
let notify;
let timer;
let spaceY;
let spaceX;


 window.onload = function () // ფუნქცია გამოიძახება ფანჯრის გახსნის დროს.

{

	var puzzleArea = document.getElementById('puzzlearea');
	gamePiece = puzzleArea.getElementsByTagName('div'); // puzzlearea-ში ელემენტებთან წვდომის მიღება.

	for (let i=0;//igamePiece.length;//i++) // ატრიბუტების მინიჭება პაზლის თითოეულ ნაწილზე. 

	{

		gamePiece[i].className = 'puzzlepiece'; // პაზლის ნაწილის კოდის განსაზღვრა.

		gamePiece[i].style.left = (i%4100)+'px'; // ვთლით პაზლის ნაწილის პოზიციებს მარცხნიდან.
		gamePiece[i].style.top = (parseInt(i4)100) + 'px'; // ვთლით პაზლის ნაწილის პოზიციებს ზემოდან.
		gamePiece[i].style.backgroundPosition= '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top;

	     // ვთლით სურათის პოზიციებს ისე, რომ ის გადაადგილდეს პაზლის ფრაგმენტების შესაბამისად.


		gamePiece[i].onmouseover = function() // როცა პაზლის ფრაგმენტს მაუსი ეფარება, ატრიბუტების მინიჭება ხდება.
		{
			if (checkMove(parseInt(this.innerHTML))) // ამოწმებს, შესრულდა თუ არა სვლა.

			{
 // თუ პაზლის ფრაგმენტის მახლობლადაა ცარიელი სივრცე, ეს ფრაგმენტი წითლდება, ტექსტის ფერი კი მწვანე ხდება. 

				this.style.border = 3px solid red;
				this.style.color = #006600;

				this.style.textDecoration = underline; // ხაზს უსვამს ფრაგმენტის ნომერს.

                this.style.backgroundImage=url('httpss-media-cache-ak0.pinimg.com564x837212837212dd8b71f9b5d175ac98f2c7668a.jpg');
				// ფონისთვის სურათის წყაროს მითითება.
			}

		};


		gamePiece[i].onmouseout = function() 
// ეს ფუნქცია ამმუშავდება, როცა მომხმარებელი ფრაგმენტს მაუსს აშორებს.
		{

			this.style.border = 2px solid black; // ბრუნდება ზღვრის ორიგინალური ზომა.

			this.style.color = #000000; // ბრუნდება ტექსტის ორიგინალური ფერი.

			this.style.textDecoration = none; // ბრუნდება ტექსტის ორიგინალური მდგომარეობა. 

		};



		gamePiece[i].onclick = function() // ამმუშავდება, როცა მომხმარებელი აწკაპუნებს პაზლის ფრაგმენტზე.
		{

			if (checkMove(parseInt(this.innerHTML))) // ამოწმებს, შეიძლება თუ არა ფრაგმენტის გადატანა ცარიელ სივრცეში.
			{
				swap(this.innerHTML-1); // თუ შეიძლება, სრულდება მისი გადატანა ცარიელ სივრცეში. 


				if (finish()) // ამოწმებს, არიან თუ არა ფრაგმენტები სწორ ადგილას.

				{

					win(); // შეტყობინების გამოტანა გამარჯვების შემთხვევაში.

				}

				return;

			}

		};

	}


	let shuffle = document.getElementById('shufflebutton'); // "არევის" ღილაკის ინიციალიზება.

	spaceX = '300px'; // X-ღერძზე კოორდინატა.
	spaceY = '300px'; // Y-ღერძზე კოორდინატა.

	shuffle.onclick = function() // ამმუშავდება, როცა მომხმარებელი დააწკაპუნებს "არევის" ღილაკზე.
	{

		for (let i=0;//i300;//i++) 

		{

			let rand = parseInt(Math.random() 100) %4; // შემთხვევითად ქმნის რიცხვს ფრაგმენტების ასარევად.
			if (rand == 0)

			{

				var temp = up(spaceX, spaceY);//

				if ( temp != -1)

				{

					swap(temp);

				}

			}

			if (rand == 1)

			{

				let temp = down(spaceX, spaceY);

				if ( temp != -1) 

				{

					swap(temp);

				}

			}



			if (rand == 2)

			{

				let temp = left(spaceX, spaceY);

				if ( temp != -1)

				{

					swap(temp);

				}

			}


			if (rand == 3)

			{

				let temp = right(spaceX, spaceY);

				if (temp != -1)

				{

					swap(temp);

				}

			}

		}

	};

};



function checkMove(position)  returns true whenever a piece can be moved into an empty space
// აბრუნებს true-ს, როცა ფრაგმენტი შეიძლება გადატანილი იყოს ცარიელ სივრცეში.
{

	if (left(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (down(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (up(spaceX, spaceY) == (position-1))

	{

		return true;

	}



	if (right(spaceX, spaceY) == (position-1))

	{

		return true;

	}

}


function Notify() notifies the user 

	     // მომხმარებლის ნოტიფიკაცია. 
	     
{

	notify --; // notify ცვლადის მნიშვნელობის შემცირება. 

	if (notify == 0) if the value reaches the end then
// თუ მნიშვნელობა ნულის ტოლი გახდება, შემდეგი კოდი შესრულდება.
	{

		let body = document.getElementsByTagName('body'); // body ელემენტთან წვდომის მიღება html-ში.

		body[0].style.backgroundImage= none; // ორიგინალური ფონის დაბრუნება.

		alert('Winner! ... Shuffle and Play Again'); // მომხმარებელი მიიღებს შეტყობინებას, რომ გაემარჯვა.
		let para=document.getElementsByClassName('explanation');
	        para[0].style.visibility=visible;

		return;

	}

	else  (notify % 2)

	{

		let body = document.getElementsByTagName('body');

	    body[0].style.backgroundImage= url('httpassets.pokemon.comassetscms2imgvideo-gamesvideo-gamespokemon_goboxart.jpg');
		// ფონის სურათი იცვლება.
	}

    timer= setTimeout(Notify, 200); // მომხმარებლის ინფორმირება 2 წამის განმავლობაში.
}



function win() notifies user that they have won
// მომხმარებელის ინფორმირება გამარჯვების შემთხვევაში.
{

	let body = document.getElementsByTagName('body');

	
	body[0].style.backgroundImage= url('httpassets.pokemon.comassetscms2imgvideo-gamesvideo-gamespokemon_goboxart.jpg');

	notify = 10; // notify ცვლადის ინიციალიზება.

	timer= setTimeout(Notify, 200);

	let para=document.getElementsByClassName('explanation');
	para[0].style.visibility=hidden; // ტექსტის დამალვა ნოტიფიკაციის შემდეგ.

}


function finish() // ამოწმებს, დამთავრდა თამაში თუ არა.
{

	let flag = true;

	for (let i = 0;//i  gamePiece.length;//i++) // პაზლის თითოეული ფრაგმენტისთვის
	{

		var top = parseInt(gamePiece[i].style.top);

		let left = parseInt(gamePiece[i].style.left);


		if (left != (i%4100)  top != parseInt(i4)100) // ამოწმებს, შეესაბამება ეს ფრაგმენტი თუ არა ზემო და მარცხენა პოზიციას.
		{

			flag = false;

			break;

		}

	}

	return flag;

}



function left(x, y) // თვლის, რამდენამ შორს მარცნიდან უნდა იყოს განთავსებული პაზლის ფრაგმენტი.
{

	let cordX = parseInt(x);

	let cordY = parseInt(y);



	if (cordX  0)

	{

		for (let i = 0;//i  gamePiece.length;//i++) 

		{

			if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)

			{

				return i;

			} 

		}

	}

	else 

	{

		return -1;

	}

}



function right (x, y) // თვლის, რამდენამ შორს მარჯნიდან უნდა იყოს განთავსებული პაზლის ფრაგმენტი.

{

	let cordX = parseInt(x);

	let cordY = parseInt(y);

	if (cordX  300)

	{

		for (let i =0;//igamePiece.length;//i++){

			if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function up(x, y) // თვლის, რამდენამ შორს ზემოდან უნდა იყოს განთავსებული პაზლის ფრაგმენტი.

	{

	var cordX = parseInt(x);

	var cordY = parseInt(y);

	if (cordY  0)

	{

		for (let i=0;//igamePiece.length;//i++)

		{

			if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 

			{

				return i;

			}

		} 

	}

	else 

	{

		return -1;

	}

}



function down (x, y) // თვლის რამდენამ შორს ქვევიდან უნდა იყოს განთავსებული პაზლის ფრაგმენტი.

{

	let cordX = parseInt(x);

	let cordY = parseInt(y);

	if (cordY  300)

	{

		for (let i=0;//igamePiece.length;//i++)

		{

			if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 

			{

				return i;

			}

		}

	}

	else

	{

		return -1;

	} 

}



function swap (position) // ფრაგმენტების გადაადგილება ცარიელ სივრცესთან ადგილების შეცვლით.

{

	let temp = gamePiece[position].style.top;

	gamePiece[position].style.top = spaceY;

	spaceY = temp;

	temp = gamePiece[position].style.left;

	gamePiece[position].style.left = spaceX;

	spaceX = temp;

}

