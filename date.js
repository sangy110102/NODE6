
exports.getDate = function(){

    var today = new Date();
    // var currentDay = today.getDay();
    // var day = '';

    // switch (currentDay) {
    //     case 0:
    //         day = 'Sunday';
    //         break;

    //     case 1:
    //         day = 'Monday';
    //         break;

    //     case 2:
    //         day = 'Tuesday';
    //         break;

    //     case 3:
    //         day = 'Wednesday';
    //         break;


    //     case 4:
    //         day = 'Thursday';
    //         break;

    //     case 5:
    //         day = 'Friday';
    //         break;

    //     case 6:
    //         day = 'Saturday';
    //         break;
    
    //     default:
    //         console.log('Error !!! Current day is ' + currentDay);
    //         break;
    // }

    var option = {
        weekday : 'long',
        day : 'numeric',
        month : 'long'
    };

    var day = today.toLocaleDateString('en-US',option);
    return day;
}