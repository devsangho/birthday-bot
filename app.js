const util = require('util');
const schedule = require('node-schedule');
const Slack = require('slack-node');  // 슬랙 모듈 사용
const webhookUri = "https://hooks.slack.com/services/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";  // Webhook URL
const slack = new Slack();
slack.setWebhook(webhookUri);

const members = require('./members.json');
let today = new Date();
let thisMonth = today.getMonth()+1;

function getBirthdayMembers(month) {
    let birthdayMembers = []
    for (let i = 0; i < members.length; i++) {
        if (month + "월" == members[i].birthday.split(" ")[0])
            // console.log(members[i]);
            birthdayMembers.push(members[i]);
    }
    return birthdayMembers;
}

function getFields(members) {
    let fields = [];
    for (let i = 0; i < members.length; i++) {
        fields.push(
            {
                title: members[i].name + " ❤️",
                value: members[i].birthday,
                short: false,
            }
        )
    }
    return fields;
}

const send = async (message) => {

    let birthdayMembers = getBirthdayMembers(thisMonth);
    let fields = getFields(birthdayMembers);

    slack.webhook({
        text: message,
        attachments:[
            {
                fallback:"생일을 진심으로 축하드립니다!",
                pretext:"생일을 진심으로 축하드립니다!",
                color:"#ee006f",
                fields: fields,
            }
        ]
    }, function(err, response){
        console.log(response);
    });

}
// 매년 매월 첫째주 월요일 오전 11시 00분에 생일자 발표!
schedule.scheduleJob('* * * * 5', send("🥳" + thisMonth + "월의 생일자 안내"));

router.post("/", function(req, res, next) {
    let payload = req.body;
    res.sendStatus(200);

    if (payload.event.type === "app_mention") {
        if (payload.event.text.includes("tell me a joke")) {
            // Make call to chat.postMessage using bot's token
        }
    }
}

