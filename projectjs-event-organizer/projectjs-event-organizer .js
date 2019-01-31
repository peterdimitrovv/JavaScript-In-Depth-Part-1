var id=0;
var events = [];
var addingEventsAndClients=true;
var clients = [];

var createEvent = function(nameOfEvent, flagForAccess = true, entryFee = 0, date = false){
    if(nameOfEvent === undefined){
        return "This event does not exist";
    }
    if(addingEventsAndClients === false){
        return "You cannot add events! The system is closed!"
    }
    else {
        var currentId = id++;
        var event = {
            id: currentId,
            name: nameOfEvent,
            flag: !!flagForAccess,
            entryFee: entryFee,
            archived: false,
            gainingFromClients: 0,
            allRatings: [],
            clientsRatedTheEvent: [],
            AppropriateOrNot: function(){
                if(flagForAccess==true){
                    var age = "Appropriate (18-)";
                }
                else{
                    var age = "Inappropriate (18+)";
                }
                return currentId + ". " + nameOfEvent + ": " + age;
            },
            clients: []
        };
        if(date === true){
            event.date=new Date();
        }
        events.push(event);
        return event;
    }
};

var allEvents = function(){
    var allEvents=[];
    var eventsLength=events.length;
    for (var i = 0; i < eventsLength; i++){
        allEvents.push(events[i].AppropriateOrNot());
    }
    return allEvents;
};

var indexOf = function (id){
    return events.map(e => e.id).indexOf(id);
}

let indexOfClients = function (clientId){
    return clients.map(c => c.clientId).indexOf(clientId);
}

var deleteEvent = function deleteEventFunction(id){
    if(id === undefined || events.length == 0){
        return("You can not delete an element which is undefined")
    }
    else{
        var index = indexOf(id);
        if(index == -1) {
            return "Event not found.";
        }
        events.splice(index, 1);
        return("You deleted the event: " + id + " successfully!");
    }
};

var updateEvent = function(id, newEventName, newFlagForAccess=true){
    if(indexOf(id) === -1){
        return("There is not an event with this id!")
    }
    if(newEventName === undefined) {
        return "Name is required.";
    }
    let event = events[indexOf(id)];
    event.name = "" + newEventName;
    event.flagForAccess = !!newFlagForAccess;
    return("Successfully updated event!")
}

var clientId=0;
var createClient = function(name, gender, age, moneyInWallet){
    var currentClientId=clientId++;
    if(addingEventsAndClients === false){
        return "You cannot add clients! The system is closed!"
    }
    else{
        var client = {
            clientId: currentClientId,
            name: name,
            gender: gender,
            age: age,
            moneyInWallet: moneyInWallet,
            toBecomeVip: 0,
            addedToTheEvent: 0,
            toString: function() {
                return currentClientId + ". "  + name + " ," + gender + " ," + age;
            }
        }
    }
    clients.push(client);
    return client;
};

var addClientToEvent = function(id, clientId){
    if(indexOf(id) == -1){
        return "The event does not exist!!!"
    }

    var client = clients[indexOfClients(clientId)];
    var event = events[indexOf(id)];
    for(var i=0; i<event.clients.length; i++){
        if(event.clients[i].clientId===clientId){
            return "The client already exists!";
        }
    }
    if(events[indexOf(id)].archived){
        return "The event is archived!!!"
    }
    if(event === undefined || client === undefined){
        return "There is not such an event or client!! "
    }
    if(event.flag === false && client.age < 18){
        return "Client's age is not appropriate for this event";
    }
    if(client.moneyInWallet>=event.entryFee){
        client.toBecomeVip++;
        if(client.toBecomeVip === 6){
            client.toBecomeVip = 0;
        }else{
            client.moneyInWallet -= event.entryFee;
            event.gainingFromClients += event.entryFee;
        }
        event.clients.push(client);
        return client;
    }
    else{
        return "The client does not have enough money for this event!!!";
    }

}

var allClientsOfEvent = function(id, gender){
    var clients=events[indexOf(id)].clients;
    if(gender === undefined){
     return clients.map(c => c.toString());
    }
    var filteredClients=[];
    if(gender === 'm'){
        for(var i=0; i < clients.length; i++){
            if(clients[i].gender === 'm'){
                filteredClients.push(clients[i]);
            }
        }
        return filteredClients.toString();
    }
    else if(gender === 'f'){
        for(var i=0; i < clients.length; i++){
            if(clients[i].gender === 'f'){
                filteredClients.push(clients[i]);
            }
        }
        return filteredClients.toString();
    }
    else{
        return "Invalid gender!";
    }
}

var deleteClientFromEvent = function(id, clientId){
    var clients=events[indexOf(id)].clients;
    if(id === undefined || clientId === undefined || events.length == 0){
        return("You can not delete an element which is undefined")
    }
    if(clientId > clients.length){
        return "There is not a client with this id"
    }
    else{
        clients.splice(clientId == clients.clientId, 1);
        return("You deleted the client: " + clientId + " successfully!");
    }
}

var enableAddingEventsAndClients = function(){
    addingEventsAndClients=true;
    return "You can add events and clients to them!!!"
}

var disableAddingEventsAndClients = function(){
    addingEventsAndClients=false;
    return "You cannot add events and clients to them!!!"
}

var eventWithMostClients = function(){
    var maxClientsNumber = 0;
    var maxCount = 0;
    for(var i=0; i<events.length; i++){
        var clientsCount = events[i].clients.length;
        if(maxClientsNumber < clientsCount){
            maxClientsNumber = clientsCount;
            maxCount = 1;
        }
        else if(maxClientsNumber === clientsCount) {
            if(clientsCount !== 0){
                maxCount++;
            }
        }
    }
    if(maxCount > 1){
        return 'There is no event with most clients';
    }
    for(var i = 0; i < events.length; i++){
        var clientsCount = events[i].clients.length;
        if(maxClientsNumber === clientsCount) {
            return events[i];
        }
    }

    return 'Something got wrong!!!';
}

var eventsAppropriateForMinors = function(){
    var eventsForMinors=[];
    if(events.length == 0){
        return "There are no events!!!"
    }
    for(var i = 0; i < events.length; i++){
        if(events[i].flag===true){
            eventsForMinors.push(events[i]);
        }
    }
    return eventsForMinors;
}

var filteredEvents = function(){
    var appropriateOrNotEvents=[];
    if(events.length == 0){
        return "There are no events!!!";
    }
    for(var i=0; i < events.length; i++){
        if(events[i].flag === true){
            events[i].name='#'+events[i].name;
        }
        else{
            events[i].name='*'+events[i].name;
        }
        appropriateOrNotEvents.push(events[i]);
    }
    return appropriateOrNotEvents;
}

var searchByCriterion = function(criterion){
    var arrayByCriterion=[];
    if(typeof criterion === "boolean"){
        for(var event of events){
            if(event.flag===criterion){
                arrayByCriterion.push(event);
            }
        }
    }
    else if(typeof criterion === "string"){
        for(var event of events){
            if(event.name.includes(criterion)){
                arrayByCriterion.push(event);
            }
        }
    }
    else{
        return "There is no opportunity for search on this criterion!!!"
    }
    return arrayByCriterion;
}

var addEventsEntryFee = function(id, entryFee){
    if(events.length == 0){
        return "There are no events!!!";
    }
    events[indexOf(id)].entryFee=entryFee;
    return events[indexOf(id)];
}

var paidEvents = function(){
    if(events.length==0){
        return "There are no events!!!";
    }
    for(var i = 0; i < events.length; i++){
        if(events[i].entryFee>0){
            events[i].name='$'+events[i].name;
        }
        else if(events[i].entryFee==0){
            events[i].name='!'+events[i].name;
        }
    }
    return events;
}

var archivedEvent = function(id){
    events[indexOf(id)].archived=true;
    events[indexOf(id)].name='~' + events[indexOf(id)].name;
    allArchivedEvents.push(events[indexOf(id)]);
    return events[indexOf(id)];
}

var allArchivedEvents=[];
var listingOfallArchivedEvents = function(){
    if(allArchivedEvents.length === 0){
        return "There are no archived events!!!"
    }
    var eventsToString = [];
    for (var i = 0; i < allArchivedEvents.length; i++) {
        var currentEvent = allArchivedEvents[i];
        eventsToString.push(currentEvent.name + "..." + "Rating: " + eventRating(currentEvent.id));
    }
    return allArchivedEvents;
}

var allUnarchivedEvents=[];
var listingOfAllUnarchivedEvents = function(){
    for(var i = 0; i < events.length; i++){
        if(events[i].archived == false){
            allUnarchivedEvents.push(events[i])
        }
    }
    if(allArchivedEvents.length == 0){
        return "There are no unarchived events!!"
    }
    return allUnarchivedEvents;
}

var gaining = function(id){
    if(events[indexOf(id)].archived === true){
    return events[indexOf(id)].gainingFromClients + " leva gaining";
    }
    else{
        return "The event is not archived!!";
    }
}

var eventRatingFromClient = function(id, clientId, rating){
    if(events[indexOf(id)].clientsRatedTheEvent.indexOf(clientId) != -1){
        return "The client already rated the event!!!";
    }

    for(var i = 0; i < events[indexOf(id)].clients.length; i++){
        if(events[indexOf(id)].clients[i].clientId === clientId){
            if(rating < 1 || rating > 10){
                return "Invalid rating.Please insert a number between 1 and 10!!!";
            }
            var ratingFromThisClient = rating;
            events[indexOf(id)].allRatings.push(ratingFromThisClient);
            events[indexOf(id)].clientsRatedTheEvent.push(clientId);
            return eventRating(id);
        }
        else{
            return "The client is not registered for this event!!! :(";
        }
    }

    if(events[indexOf(id)].archived === false){
        return "The event is not archived!!!"
    }
}

var eventRating = function(id){
    var sum = 0;
    var ratings = events[indexOf(id)].allRatings;
    if(ratings.length == 0){
        return "Update is upcoming!!!";
    }
    for(var i = 0; i < events[indexOf(id)].allRatings.length; i++){
        sum += ratings[i];
    }
    return Math.floor(sum / events[indexOf(id)].allRatings.length * 0.6);
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Основни задачи(тестове)
//4.Създаване на събития:
console.log(createEvent("Beach Party")); //appropriate for minors,the default value for the flag is true
console.log(createEvent("Party", false)); //unappropriate for minors
console.log(createEvent("Pool Party", false, 20)); //entry fee = 20 leva
console.log(createEvent("Disco", true, 30)); //appropriate for minors, the value for the flag is true, there is entry fee = 30 leva
console.log(createEvent()); //Name of event is required

//2.Примерна визуализация на единично събития: Grand opening of new Club : 18+ 
console.log(createEvent("Beach Party").AppropriateOrNot()); //appropriate for minors
console.log(createEvent("Party", false).AppropriateOrNot()); //unappropriate for minors
console.log(createEvent("Pool Party", true).AppropriateOrNot()); //appropriate for minors
//Извеждане на всички събития
console.log(allEvents());

//3.Изтриване на събитие
console.log(deleteEvent(2)); //delete event 2
console.log(allEvents()); //аll events without number 2
console.log(deleteEvent(10)); //delete event 6
console.log(allEvents()); //аll events without number 6 and 2

//5.Aктуализиране на събития
console.log(updateEvent(1, "Student Party")); //update event with id=1
console.log(updateEvent(2, "House Party")); //no event with this id
console.log(updateEvent(0, "House Party"));
console.log(allEvents());

//Създаване на клиент
console.log(createClient("Peter Dimitrov", 'm', 20, 20));//задължително въвеждане и на четиритяхто стойности, иначе са undefined
console.log(createClient("Ivan Dimitrov", 'm', 11, 0));
console.log(createClient("Ivka Marinova", 'f', 40, 200));
console.log(createClient("Valeri Bojinov", 'm', 36, 500));

//Добавяне на клиент към вече съществуващо събитие
console.log(addClientToEvent(1,1)); //unappropriate event for minors
console.log(addClientToEvent(0,2)); //add client
console.log(addClientToEvent(0,3)); //add client
console.log(addClientToEvent(0,0));
console.log(addClientToEvent(2,1)); //this event was deleted so it does not exist

//7. Визуализирайте списък с всички клиенти които присъстват на определено събитие. 
console.log(allClientsOfEvent(0)); //clients of event 0
console.log(allClientsOfEvent(0, 'm')); //filtered by gender m
console.log(allClientsOfEvent(0, 'f')); //filtered by gender f
console.log(allClientsOfEvent(0, 'w')); //invalid gender

//8. Премахнете присъстващ потребител от събитието. 
console.log(deleteClientFromEvent(0, 3)); //deleted successfully
console.log(deleteClientFromEvent(0, 4)); //no client
console.log(deleteClientFromEvent(1, 1)); //no client

//Първа част
//1. Създайте функционалност който да спира добавянето на събития или добавянето на клиенти на централно ниво. 
console.log(disableAddingEventsAndClients()); //can not add events and clients
console.log(createEvent("Beach Party")); //system is closed
console.log(createClient("Qna Petrova", 'f', 45, 50)); //system is closed
console.log(enableAddingEventsAndClients()); //can add events and clients
console.log(createEvent("Beach Party")); //system is open and the event is added
console.log(createClient("Qna Petrova", 'f', 45, 50)); //system is open and the client is added

//2.Дата
console.log(createEvent("Disco Party", true, 10, true)); //event with date
console.log(createEvent("Hawai Party", false, 0, false)) //no date

//3. Създайте функционалност за извеждане на събитието с най-много добавени клиенти. 
console.log(eventWithMostClients()); //return the event with most clients, which in our case is event 0

//4. Изведете всички събития които са подходящи за малолетни посетители. 
console.log(eventsAppropriateForMinors()); //return all events which are appropriate for minors

//5. Изведете всички събития като ги групирате, събитията които са предназначени за пълнолетни посетители трябва да имат звездичка пред името си “*” а тези подходящи за непълнолетни диез “#” 
console.log(filteredEvents()); //filtered events with * and # in front of their names

//6. Създайте механизъм за филтриране на събития по определен критерии. Функцията трябва да има възможност да получава име / или флаг за достъп и да визуализира само тези събития които отговарят на критериите.  
console.log(searchByCriterion("Haw")); //criterion = "string", all events with name which contains "Haw"
console.log(searchByCriterion(true)); //criterion = "boolean", all events with true
console.log(searchByCriterion("Bea")); //criterion = "string", all events with name which contains "Bea"
console.log(searchByCriterion(false)); //criterion = "boolean", all events with false

//част 2
//2.	Добавете, свойство цена към всяко събитие което организирате. Цената не е задължително свойство, всяко събитие което е регистрирано без цена, става автоматично безплатно.   
console.log(createEvent("Hoola Party", false)); //entry fee=0, default
console.log(createEvent("Hey Party", false, 20)); //entry fee=20
console.log(createEvent("Party 1", true, 50)); 
console.log(createEvent("Hey Party 2", false, 20));
console.log(createEvent("Hey", true, 40));
console.log(createEvent("Heyyyyyyy", true, 40));
console.log(addEventsEntryFee(10,20)); //if we forget to add entry fee and the we decide to add fee

//3.	Всички събития, които са платени трябва да визуализират заглавията си със знака $ пред имената си. Безплатни събития трябва да визуализират имената си със знак “!” 
console.log(paidEvents());

//4.	Всеки регистриран клиент, в системата трябва да разполага с портфейл. Портфейла съдържа пари които се намаляват при регистрация за ново събитие. Ако потребителя няма пари в портфейла си, системата не го регистрира.  
console.log(addClientToEvent(3,0)); //The money are not enough
console.log(addClientToEvent(0,3)); //The client is already registered for this event
console.log(addClientToEvent(3,2)); //The client has enough money and they are added for the event and they paid 30 leva for the entry fee (200 - 30 = 170leva)
console.log(addClientToEvent(3,3)); //The client has enough money (500 - 30 = 470leva). They are registered for the event

//5.  Фирмата добавя понятие VIP криент. VIP е всеки който е добавен като клиент на поне 5 събития. VIP клиентите не заплащат такса при посещението си на следващото събитие. При регистрация за шестото си събитие статуса им се нулира и те отново се превръщат в обикновенни клиенти.  Клиентите не могат да се добавят към едно и също събитие
console.log(createClient("Nikoleta Milenova", 'f', 23, 500));
console.log(addClientToEvent(10,6));
console.log(addClientToEvent(3,6));
console.log(addClientToEvent(8,6));
console.log(addClientToEvent(12,6));
console.log(addClientToEvent(13,6));
console.log(addClientToEvent(14,6)); //event 6 is free, entry fee = 40, but the client is VIP
console.log(addClientToEvent(15,6)); //The client is no more vip

//част 3
//1.  2.Създайте функционалност за архивиране на събития. Архивираните събития не могат да приемат гости. Архивираните събития, могат да бъдат само и единствено преглеждани като такива 
console.log(createEvent("Partyyyyyy", false)); 
console.log(createEvent("Yeyyyyyy", false, 20));
console.log(archivedEvent(16)); //name with ~
console.log(archivedEvent(17)); //name start with ~
console.log(addClientToEvent(16,6)); //The event is archived, so the client cannot be added
console.log(addClientToEvent(17,6)) //The client cannot be added

//3. Създайте функционалност за листинг на архивирани събития. неархивирани
console.log(listingOfallArchivedEvents()); //всички архивирани събития
console.log(listingOfAllUnarchivedEvents()); //всички неархивирани събития

//4. Създайте функционалност за визуализация на приходите от клиенти, които едно архивирано събитие е генерирало 
console.log(gaining(0)); //the event is not archived
console.log(archivedEvent(0)); //the event is archived
console.log(gaining(0)); //the entry fee is 0
console.log(gaining(3)); 
console.log(archivedEvent(3));
console.log(gaining(3)); //90 leva gaining

//5.	Създайте функционалност за оценка на събитията рейтинг. Всяко едно събития в началото на своето създаване има рейтинг 0.  
console.log(eventRatingFromClient(15, 7, 6)); //The event is not archived
console.log(archivedEvent(15)); //The event is archived
console.log(eventRating(0)); //The event is not rated
console.log(eventRatingFromClient(3, 2, 10)); //rating=6
console.log(eventRatingFromClient(3, 2, 10)); //The client rated already
console.log(eventRating(3)); //eventRating = 6