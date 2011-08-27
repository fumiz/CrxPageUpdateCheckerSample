// Settings
// timespan(1 hour)
var delay_seconds = 60 * 60;

// AJAX Object
var ajax_transport = new XMLHttpRequest();

var previous_entry = null;

var XMLHttpRequest_STATE_COMPLETE = 4;

function initialize() {
    // first check
    check_update();
}

function check_update() {
    // send request
    ajax_transport.open("GET", "http://mitc.xrea.jp/diary/", true);
    ajax_transport.onreadystatechange = process;
    ajax_transport.send();

    // next check
    setTimeout(check_update, 1000 * delay_seconds);
}

//
function process() {
    if (ajax_transport.readyState != XMLHttpRequest_STATE_COMPLETE) {
        return;
    }

    var response = ajax_transport.responseText;
    // create jQuery Object from HTML text
    var jobj = $(response);

    // find check point
    var latest_entry = jobj.find('#side-recent-diary').find('li').first().find('a').attr('href');
    
    // compare between previous check time and latest check
    console.info("check", latest_entry, previous_entry);
    if (latest_entry != previous_entry) {
        notify();
    }
    previous_entry = latest_entry;
}

function notify() {
    var note = webkitNotifications.createNotification(null,"blog notifier","new entry was posted");
    note.show();
}
