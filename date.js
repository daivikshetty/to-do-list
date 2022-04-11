module.exports.getDay=getDay;       //no parenthesis...bcoz we don't want to call the function
function getDay(){
      const today=new Date();         //object of type date is created

      const options={
            weekday:"long",         //weekday is a keyword
            day:"numeric",
            month:"long"
      };

      

      let day=today.toLocaleDateString("en-US",options);

      // times.push(time);
      return day;
}

//module.exports can be replaced with exports which doesn't change it's meaning!!
exports.getTime=function(){        //using the concept of anonymous functions

      const today=new Date();

      const options={
            hour:"numeric",
            minute:"numeric",
            second:"numeric"     //for checking if the time is working
      };

      let time=today.toLocaleTimeString("en-US",options);
      return time;
}
