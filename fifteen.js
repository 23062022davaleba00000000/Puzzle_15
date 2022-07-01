// გლობალური ცვლადები. 
let gamePiece;
let notify;
let timer;
let spaceY;
let spaceX;


 window.onload = function () // ფუნქცია გამოიძახება ფანჯრის გახსნის დროს.

{

	let puzzleArea = document.getElementById('puzzlearea');
	gamePiece = puzzleArea.getElementsByTagName('div'); // puzzlearea-ში ელემენტებთან წვდომის მიღება.

	for (let i=0;//igamePiece.length;//i++) // ატრიბუტების მინიჭება პაზლის თითოეულ ნაწილზე. 

	{

		gamePiece[i].className = 'puzzlepiece'; // პაზლის ფრაგმენტის კლასის განსაზღვრა.

		gamePiece[i].style.left = (i%4100)+'px'; // ვთლით პაზლის ფრაგმენტის პოზიციებს მარცხნიდან.
		gamePiece[i].style.top = (parseInt(i4)100) + 'px'; // ვთლით პაზლის ფრაგმენტის პოზიციებს ზემოდან.
		gamePiece[i].style.backgroundPosition= '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top;

	     // ვთლით სურათის პოზიციებს ისე, რომ ის გადაადგილდეს პაზლის ფრაგმენტების გადაადგილების შესაბამისად.


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
// ეს ფუნქცია ამუშავდება, როცა მომხმარებელი ფრაგმენტს მაუსს აშორებს.
		{

			this.style.border = 2px solid black; // ბრუნდება ზღვრის ორიგინალური ზომა.

			this.style.color = #000000; // ბრუნდება ტექსტის ორიგინალური ფერი.

			this.style.textDecoration = none; // ბრუნდება ტექსტის ორიგინალური მდგომარეობა. 

		};



		gamePiece[i].onclick = function() // ამუშავდება, როცა მომხმარებელი აწკაპუნებს პაზლის ფრაგმენტზე.
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

	spaceX = '300px'; // X-ღერძზე კოორდინატი.
	spaceY = '300px'; // Y-ღერძზე კოორდინატი.

	shuffle.onclick = function() // ამუშავდება, როცა მომხმარებელი დააწკაპუნებს "არევის" ღილაკზე.
	{

		for (let i=0;//i300;//i++) 

		{

			let rand = parseInt(Math.random() 100) %4; // შემთხვევითად ქმნის რიცხვს ფრაგმენტების ასარევად.
			if (rand == 0) // თუ ეს რიცხვი ნულის ტოლია,
			{
				let temp = up(spaceX, spaceY); // ფრაგმენტი გადაადგილდება ზევით.
				if ( temp != -1)
				{
					swap(temp);
				}
			}

			if (rand == 1) // თუ ეს რიცხვი ერთის ტოლია,

			{
				let temp = down(spaceX, spaceY); // ფრაგმენტი გადაადგილდება ქვევით.
				if ( temp != -1) 
				{
					swap(temp);
				}
			}

			if (rand == 2) // თუ ეს რიცხვი ორის ტოლია,
			{
				let temp = left(spaceX, spaceY); // ფრაგმენტი გადაადგილდება მარცხნივ.
				if ( temp != -1)
				{
					swap(temp);
				}
			}

 
			if (rand == 3) // თუ ეს რიცხვი სამის ტოლია,
			{

				let temp = right(spaceX, spaceY); // ფრაგმენტი გადაადგილდება მარჯვნივ.
				if (temp != -1)
				{
					swap(temp);
				}
			}
		}
	};
};



function checkMove(position) 
// აბრუნებს true-ს, როცა ფრაგმენტი შეიძლება გადატანილი იყოს ცარიელ სივრცეში.
{
	if (left(spaceX, spaceY) == (position-1)) // აბრუნებს true-ს, თუ შეიძლება მარცხნივ გადატანა.
	{
		return true;
	}

	if (down(spaceX, spaceY) == (position-1)) // აბრუნებს true-ს, თუ შეიძლება ქვემოთ გადატანა.
	{
		return true;
	}

	if (up(spaceX, spaceY) == (position-1)) // აბრუნებს true-ს, თუ შეიძლება ზევით გადატანა.
	{
		return true;
	}


	if (right(spaceX, spaceY) == (position-1)) // აბრუნებს true-ს, თუ შეიძლება მარჯვნივ გადატანა.
	{
		return true;
	}

}


function Notify() 

// მომხმარებლის ნოტიფიკაცია. 
	     
{

	notify --; // notify ცვლადის მნიშვნელობის შემცირება. 

	if (notify == 0) 
// თუ მნიშვნელობა ნულის ტოლი გახდება, შემდეგი კოდი შესრულდება.
	{

		let body = document.getElementsByTagName('body'); // body ელემენტთან წვდომის მიღება html-ში.

		body[0].style.backgroundImage = none; // ორიგინალური ფონის დაბრუნება.

		alert('Winner! ... Shuffle and Play Again'); // მომხმარებელი მიიღებს შეტყობინებას, რომ გაიმარჯვა.
		let para=document.getElementsByClassName('explanation'); // 'explanation' კლასის მქონე
		// პარაგრაფთან წვდომის მიღება.
	        para[0].style.visibility=visible;  // პარაგრაფის ხილვადობის სტატუსი იცვლება.

		return;

	}

	else  (notify % 2) // თუ notify-ის მნიშვნელობა კენტი რიცხვია,
	{
		let body = document.getElementsByTagName('body');

	    body[0].style.backgroundImage= url('httpassets.pokemon.comassetscms2imgvideo-gamesvideo-gamespokemon_goboxart.jpg');
		// ფონის სურათი იცვლება.
	}

    timer= setTimeout(Notify, 200); // მომხმარებლის ინფორმირება 2 წამის განმავლობაში.
}

function win()
// მომხმარებელის ინფორმირება გამარჯვების შემთხვევაში.
{

	let body = document.getElementsByTagName('body');

	body[0].style.backgroundImage= url('httpassets.pokemon.comassetscms2imgvideo-gamesvideo-gamespokemon_goboxart.jpg');

	notify = 10; // notify ცვლადის ინიციალიზება.

	timer = setTimeout(Notify, 200); // მომხმარებლის ინფორმირება 2 წამის განმავლობაში.

	let para=document.getElementsByClassName('explanation'); // პარაგრაფთან წვდომის მიღება.
	para[0].style.visibility=hidden; // ტექსტის დამალვა ნოტიფიკაციის შემდეგ.

}


function finish() // ამოწმებს, დამთავრდა თამაში თუ არა.
{

	let flag = true; // bool ტიპის ცვლადი.

	for (let i = 0;//i  gamePiece.length;//i++) // პაზლის თითოეული ფრაგმენტისთვის
	{

		let top = parseInt(gamePiece[i].style.top); // გამოთვლილი მონაცემების integer-ის ფორმატში გადაყვანა.

	        left = parseInt(gamePiece[i].style.left); // გამოთვლილი მონაცემების integer-ის ფორმატში გადაყვანა.


		if (left != (i%4100)  top != parseInt(i4)100) 
		// ამოწმებს, შეესაბამება ეს ფრაგმენტი თუ არა ზედა და მარცხენა პოზიციას.
		{
			flag = false;
			break;
		}
	}
	return flag;
}

function left(x, y) // თვლის, რამდენად შორს მარცნიდან უნდა იყოს განთავსებული პაზლის ფრაგმენტი.
{
	let cordX = parseInt(x); // მთელრიცხვა ფორმატში გადაყვანა.
	let cordY = parseInt(y); // მთელრიცხვა ფორმატში გადაყვანა.
		
	if (cordX  0) // თუ X-კოორდინატი ნულის ტოლია,
	{
		for (let i = 0;//i  gamePiece.length;//i++) // ყველა ფრაგმენტებისთვის შესრულდება შემდეგი კოდი.
	{
		// თუ ფრაგმენტის კოორდინატი მარცხნიდან + 100 ტოლია cordX-სა და კოორდინატი ზემოდან ტოლია cordY-სა,
		// დაგვიბრუნდება ფრაგმენტის ნომერი.
		
			if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)
		{
			return i;
			        } 
		}
	}
	// წინააღმდეგ შემთხვევაში დაგვიბრუნდება -1.
	else 
	{
		return -1;
	}
}


function right (x, y) // თვლის, რამდენად შორს მარჯნიდან უნდა იყოს განთავსებული პაზლის ფრაგმენტი.

{
	let cordX = parseInt(x);  // მთელრიცხვა ფორმატში გადაყვანა.
	let cordY = parseInt(y); // მთელრიცხვა ფორმატში გადაყვანა.

	if (cordX  300) // თუ cordX უდრის 300-ს.
	{

		for (let i = 0;//igamePiece.length;//i++){
		     
		// თუ ფრაგმენტის კოორდინატი მარცხნიდან - 100 ტოლია cordX-სა და კოორდინატი ზემოდან ტოლია cordY-სა,
		// დაგვიბრუნდება ფრაგმენტის ნომერი.
		     
			if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY) 
			{
				return i;
			}
		}
	}
	// წინააღმდეგ შემთხვევაში დაგვიბრუნდება -1.
	else
	{
		return -1;
	} 
}

function up(x, y) // თვლის, რამდენად შორს ზემოდან უნდა იყოს განთავსებული პაზლის ფრაგმენტი.

	{
	var cordX = parseInt(x); // მთელრიცხვა ფორმატში გადაყვანა.
	var cordY = parseInt(y); // მთელრიცხვა ფორმატში გადაყვანა.

	if (cordY  0) // თუ cordY-ის მნიშვნელობა ნულის ტოლია,
	{
		for (let i=0;//igamePiece.length;//i++) // ყველა ფრაგმენტისთვის შესრულდება შემდეგი კოდი.
		{
		
		// თუ ფრაგმენტის კოორდინატი ზემოდან + 100 ტოლია cordY-სა და კოორდინატი მარცხნიდან ტოლია cordX-სა,
		// დაგვიბრუნდება ფრაგმენტის ნომერი.
			
			if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 
			{
				return i;
			}
		} 
	}
	// წინააღმდეგ შემთხვევაში დაგვიბრუნდება -1.
	else 
	{
		return -1;
	}
}



function down (x, y) // თვლის რამდენად შორს ქვევიდან უნდა იყოს განთავსებული პაზლის ფრაგმენტი.

{
	let cordX = parseInt(x); // მთელრიცხვა ფორმატში გადაყვანა.
	let cordY = parseInt(y); // მთელრიცხვა ფორმატში გადაყვანა.
			
	if (cordY  300) // თუ cordY უდრის 300-ს,
	{
		for (let i=0;//igamePiece.length;//i++) // ყველა ფრაგმენტისთვის
		{
		// თუ ფრაგმენტის კოორდინატი ზემოდან - 100 ტოლია cordY-სა და კოორდინატი მარცხნიდან ტოლია cordX-სა,
		// დაგვიბრუნდება ფრაგმენტის ნომერი.
			
			if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX) 
			{
				return i;
			}
		}
	}

	// წინააღმდეგ შემთხვევაში დაგვიბრუნდება -1.
	else
	{
		return -1;
	} 
}



function swap (position) // ფრაგმენტების გადაადგილება ცარიელ სივრცესთან ადგილების შეცვლით.

{
	let temp = gamePiece[position].style.top; // დროებით ცვლადს ვანიჭებთ ფრაგმენტის ზემოდან 
	// კოორდინატის მნიშვნელობას.

	gamePiece[position].style.top = spaceY; // ფრაგმენტის ზემოდან კოორდინატს ვანიჭებთ
	// spaceY-ის მნიშვნელობას.

	spaceY = temp; // spaceY-ს ვანიჭებთ temp-ის მნიშვნელობას.

	temp = gamePiece[position].style.left;//temp ცვლადს ვანიჭებთ ფრაგმენტის მარცხნიდან კოორდინატის მნიშვნელობას.

	gamePiece[position].style.left = spaceX; // მარჯვენა კოორდინატს ვანიჭებთ spaceX-ის მნიშვნელობას.

	spaceX = temp; // spaceX-ს ვანიჭებთ temp-ის მნიშვნელობას.

}
