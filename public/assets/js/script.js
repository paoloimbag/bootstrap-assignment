var trigger = false;

function openMenu() {  //Function to open/close the menu on mobile


		if(trigger==false) //open menu
		{
			document.getElementById("nav").style.height = "auto";
			document.getElementById("nav").style.display = "block";
			trigger=true;
		}
		else //close menu
		{
			document.getElementById("nav").style.height = "0px";
			document.getElementById("nav").style.display = "none";
			trigger=false;
		}

		//console.log(trigger);
  }

window.addEventListener("resize", (event) => { //listens to window resize to to be able to reset the trigger boolean. also to prevent the nav to be hidden on desktop

	var browserWidth = window.innerWidth;
	
	if(browserWidth>=768)
	{
		document.getElementById("nav").style.height = "auto";
		document.getElementById("nav").style.display = "block";
		trigger=true;
	}

	else
	{
		document.getElementById("nav").style.height = "0px";
		document.getElementById("nav").style.display = "none"; 
		trigger=false;

	}
	//console.log(trigger);

  });

  function randomWow()
  {
	//console.log(Math.floor(Math.random() * 19));
	return  Math.floor(Math.random() * 19);
  }
  
//console.log(randomWow());


  //Display JSON data

  async function getData( jsonLocation ) {
	try{
		//getting time of the day
		var myDate = new Date();

		var dateToday = myDate.toLocaleString('en-us',{month:'short', day:'numeric', year:'numeric',hour:'numeric', minute:'2-digit'});
		//console.log(dateToday);
		
		var hrs = myDate.getHours();
		var greet;
		if (hrs < 12)
		greet = 'Good Morning';
		else if (hrs >= 12 && hrs <= 17)
		greet = 'Good Afternoon';
		else if (hrs >= 17 && hrs <= 24)
		greet = 'Good Evening';

		const response = await fetch( jsonLocation );
		// console.log( response );
		const data = await response.json();
		//console.log( data );

		const siteTitle = document.querySelector('title');
		siteTitle.innerHTML = data.siteName;

		const heading = document.querySelector('h1');
		heading.innerHTML = greet + " "+ data.userInfo.nickName+"!";

		const userName = document.querySelector('.name');
		userName.innerHTML = data.userInfo.fullName;

		//for modal
		const wordOfWisdom = document.querySelector('.modal-body p');
	
		// get nav block
		const navholder = document.querySelector('.mainNav');
		
		// get ticket stat block
		const ticketStatus = document.querySelector('.stats');

		// get unresolve ticket block
		const unresolvedTicketSection = document.querySelector('.ticket-item');

		//get task block
		const myTaskList = document.querySelector('.task-item');

		//get trend blcok
		const ticketTrend = document.querySelector('.info-list');

		//get date element
		const dateNow = document.querySelector('.date');
		dateNow.innerHTML = "as of " + dateToday;

		wordOfWisdom.innerHTML=`${data.wow[randomWow()]}`;

		//console.log(randomWow(ranWow));


		// loop through json array mainnav
		// console.log( data.mainnav );
		data.dashNav.forEach(menuItem => {
			//console.log( menuItem );

			var listItem = document.createElement('li');

			if(menuItem.navName=="Close") //adding close/open function
			{
				listItem.setAttribute("onclick","openMenu()")
			}

			listItem.className=menuItem.navClass;
			// add link in the new li
			listItem.innerHTML = `<a href="${menuItem.navLink}"><i class="${menuItem.navIcon}"></i>${menuItem.navName}</a>`;

			// add new li to the menu variable
			navholder.appendChild(listItem);
		});


		//data for stats
		data.ticketStats.forEach(ticketStat => {
			//console.log(ticketStat);

			var statItem = document.createElement('div');
			statItem.className = "col-md-3 col-sm-12 stat-block flex-fill";

			statItem.innerHTML =    `<p class="stat-name">${ticketStat.ticketType}</p>
									<p class="stat-score">${ticketStat.dataValue}</p>`;
									
			ticketStatus.appendChild(statItem);

		});

		//data for unresolved tickets
		data.unresolvedTickets.forEach(unresTick =>{
			//console.log(unresTick);

			var unresTicket = document.createElement('li');
			unresTicket.className = "d-flex flex-row align-items-center";

			unresTicket.innerHTML = `<p class="flex-fill">${unresTick.ticketStatus}</p>
									<p>${unresTick.ticketNumber}</p>`;

			unresolvedTicketSection.appendChild(unresTicket); 
		});

		//data for tasks

		
		var taskCTR = 0;
		

		data.myTasks.forEach(taskList=>{
			//console.log(taskList);

			var myTask = document.createElement('fieldset');
			taskCTR++;
			console.log(taskCTR);

			myTask.innerHTML = `<input type="checkbox" id="${taskList.taskID}" name="${taskList.taskName}" value="${taskList.taskBool}">
			<label for="${taskList.taskID}" class="flex-fill">${taskList.taskName}</label>
			<p class="${taskList.taskClass}">${taskList.taskType}</p>`;

			myTask.addEventListener('click',function() {
				var checked = document.getElementById(`${taskList.taskID}`);
				if (checked.checked)
				{
					checked.value = true;

					taskCTR--;
					console.log(taskCTR);
					if(taskCTR>0)
					{
						setTimeout(() => {
							myTask.style.display="none";
							myTask.style.opacity=0;
							myTask.style.transition="all ease-in-out 0.5s";
						  }, 500);
						
					}
					else
					{
						setTimeout(() => {
							myTask.innerHTML = `<label class="flex-fill">All Done! <a href="index.html">(Refresh Page)</a></label>`;
						  }, 500);
						
					}
				}
				else
				{
					checked.value = false;
				}

			})

			myTaskList.appendChild(myTask);

		});


		//data for ticket trend
		data.trendToday.forEach(tickTrend =>{
			//console.log(tickTrend);

			var tickTrendItem = document.createElement('li');
			tickTrendItem.className = "info-item flex-fill";

			tickTrendItem.innerHTML =`<p>${tickTrend.trendName}</p><p>${tickTrend.trendValue}</p>`;

			ticketTrend.appendChild(tickTrendItem);
		});

	} catch(error) {
		console.warn(`Nope: ${error}`);
	}
}


getData('/assets/data/content.json');

  