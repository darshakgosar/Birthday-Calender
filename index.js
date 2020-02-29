var days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
];
$('.yearButton').click(function () {
    if ($('#yearInput').val() && !($('#yearInput').val().length > 4) && $("#jsonInput").val()) {
        $('.birthdayMapping').html('');
        $('.birthdayCount').html('');
        var jsonInput = $('#jsonInput').val();
        jsonInput = eval(jsonInput);
        if (typeof jsonInput == 'object') {
            var updatedBirthdayJson = _.filter(jsonInput, function (obj) {
                return new Date(obj.birthday).getYear() == new Date($('#yearInput').val()).getYear()
            });
            if (updatedBirthdayJson.length > 0) {
                var groups = _.groupBy(updatedBirthdayJson, function (date) {
                    return days[new Date(date.birthday).getDay()]
                });
                var restDays = _.difference(days, _.keys(groups));
                if (restDays.length > 0) {
                    for (var i = 0; i < restDays.length; i++) {
                        var noBirthday = "<div class='grid-item' style='width:100%;height:20vh;background-color: lightgray;color: darkgray;font-weight: bold;'>:(</div>";
                        $('.' + restDays[i]).append(noBirthday);
                        $('.' + restDays[i] + 'Birthday').append('No Birthdays');
                    }
                }
                _.each(groups, function (obj) {
                    var cardbody = "",width, height;
                    if (obj.length > 1) {
                        if (obj.length > 4) {
                            width = "calc(100% / 3)";
                            height = obj.length % 2 == 0 ? obj.length / 2 : (obj.length + 1) / 2;
                        } else {
                            width = "calc(100% / 2)";
                            height = obj.length % 2 == 0 ? obj.length / 2 : (obj.length + 1) / 2;
                        }
                        for (var i = 0; i < obj.length; i++) {
                            var name = obj[i].name;
                            var regex = name.match(/\b(\w)/g);
                            var nameJoin = regex.join('');
                            cardbody += "<div class='grid-item' style='width:" + width + ";height:calc(20vh/" + height + ");background-color:" + random_bg_color() + ";color: white;font-weight: bold;'>" + nameJoin + "</div>";
                        }
                        $('.' + days[new Date(obj[0].birthday).getDay()]).append(cardbody);
                        $('.' + days[new Date(obj[0].birthday).getDay()] + 'Birthday').append(obj.length + ' Birthdays');
                    } else {
                        var name = obj[0].name;
                        var regex = name.match(/\b(\w)/g);
                        var nameJoin = regex.join('');
                        cardbody = "<div class='grid-item' style='width:100%;height:20vh;background-color:" + random_bg_color() + ";color: white;font-weight: bold;'>" + nameJoin + "</div>";
                        $('.' + days[new Date(obj[0].birthday).getDay()]).append(cardbody);
                        $('.' + days[new Date(obj[0].birthday).getDay()] + 'Birthday').append('1 Birthday');
                    }
                })
            }
        } else {
            alert('The value you have entered in JSON field is not valid');
        }
    } else {
        alert('Please check the data and fill all the inputs');
    }
});

// Generating Random Colors
function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
}