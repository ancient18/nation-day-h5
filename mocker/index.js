const delay = require('mocker-api/lib/delay');

const proxy = {
    'GET /api/status': (req, res) => {
        return res.json({
            status: 10000,
            info: "success",
            data: {
                "harvest": false,
                "interstellar_trip": false,
                "tech_future": false,
                "anti_epidemic": false,
            }
        });
    },
    'POST /api/complete/:game_name': (req, res) => {
        return res.json({
            "status": 10000,
            "info": "success",
        });
    },

}

module.exports = delay(proxy, 500);