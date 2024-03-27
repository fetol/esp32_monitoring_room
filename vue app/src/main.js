import { createApp } from 'vue';
import './../node_modules/bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css'
import VueChartkick from 'vue-chartkick';
import "chartkick/chart.js"
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import download from "downloadjs";

import WriteData from './components/WriteData.vue';
import Charts from './components/Charts.vue';
import LightsAll from "./components/Lights/LightsAll.vue";
import AdminPanel from "./components/Admin/AdminPanel.vue";
import LiveStream from "./components/LiveStream.vue";
import App from "./App.vue";
import axios from "axios";



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: Charts },
        { path: "/lights", component: LightsAll, meta: { auth: true } },
        { path: "/write-data", component: WriteData, meta: { auth: true } },
        { path: "/charts", component: Charts, meta: { auth: true } },
        { path: "/live-stream", component: LiveStream, meta: { auth: true } },
        { path: "/admin", component: AdminPanel, meta: { admin: true } },
        { path: "/:notFound(.*)", redirect: "/home" }
    ],
    linkActiveClass: "is-active is-tab"
});

/* navigation guards */
router.beforeEach((to, _, next) => {
    if (to.meta.auth && store.state.token === "") {
        next("/home");
        store.commit("toggleModalSignUp")
    } else if (to.meta.admin && store.state.userId != "XCvGaNAKsPR6ADhcvCC9hzFC5po2") {
        next("/home");
        store.commit("toggleModalSignUp")
    } else {
        next();
    }
})

const store = createStore({
    state() {
        return {
            showModalSignUp: false,
            showModalLogIn: false,
            showNav: false,
            email: "",
            password: "",
            token: "",
            userId: "",
            tokenExpiration: "",
            showError: false,
            showSuccess: false,
            errorMessage: "",
            time: "",
            temperature: {
                chart: [],
                data: 0
            },
            humidity: {
                chart: [],
                data: 0
            },
            pressure: {
                chart: [],
                data: 0
            },
            chart2: {
                chart: []
            }

        }
    },
    mutations: {
        toggleModalSignUp(state) {
            state.showModalSignUp = !state.showModalSignUp;
            state.showError = false;
        },
        toggleModalLogIn(state) {
            state.showModalLogIn = !state.showModalLogIn;
            state.showError = false;
        },
        toggleNav(state) {
            state.showNav = !state.showNav;
        },
        setUser(state, payload) {
            state.token = payload.token
            state.userId = payload.userId
            state.tokenExpiration = payload.tokenExpiration
        },
        logOutUser(state) {
            state.token = ""
            state.userId = ""
            state.tokenExpiration = ""
        },
        errorMessage(state, payload) {
            state.errorMessage = payload.message;
        },
        showError(state) {
            state.showError = !state.showError;
        },
        showSuccess(state) {
            state.showSuccess = !state.showSuccess;
        },
        setTime(state, payload) {
            state.time = payload.time;
        },
        setTemperature(state, payload) {
            //payload.data = actual value of temperature
            state.temperature.data = payload.data;

            //chart takes values in format [osX, osY] - [time, value]
            state.temperature.chart = state.temperature.chart.concat([
                [state.time, payload.data]
            ])
        },
        setHumidity(state, payload) {
            state.humidity.data = payload.data;

            //chart berie hodnoty [osX, osY]
            state.humidity.chart = state.humidity.chart.concat([
                [state.time, payload.data]
            ])
        },
        setPressure(state, payload) {
            state.pressure.data = payload.data;

            //chart berie hodnoty [osX, osY]
            state.pressure.chart = state.pressure.chart.concat([
                [state.time, payload.data]
            ])
        },
        editChartTemperature(state) {
            const chartShift = state.temperature.chart;
            chartShift.shift();
        },
        editChartHumidity(state) {
            const chartShift = state.humidity.chart;
            chartShift.shift();
        },
        editChartPressure(state) {
            const chartShift = state.pressure.chart;
            chartShift.shift();
        },
        setChart2(state, payload) {
            state.chart2.chart = state.chart2.chart.concat([[payload.day, payload.value]])
        },
        showData(state) {
            const firstArray = JSON.parse(JSON.stringify(state.chart2.chart))
            const theObject = {}
            for (let i = 0; i < firstArray.length; i++) {
                if (firstArray[i] !== undefined) {
                    theObject[firstArray[i][0]] = firstArray[i][1]
                }
            }
            console.log(JSON.stringify(theObject))
            /* dokumentacia k tomu na npm download(data, filename, mimetype) */
            download(JSON.stringify(theObject), "teplotaZaPosledneDni.json", "text/plain")
        }

    },
    actions: {
        downloadData(context) {
            context.commit("showData");
        },
        //context is store instance
        getChart2(context) {
            axios
                .get(
                    'https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/Chart2.json'
                )
                .then((response) => {

                    for (const key in response.data.temp) {
                        const value = response.data.temp[key].slice(0, 5); //27.01
                        /*    const time = this.chart2[key].slice(16); //12:00 */
                        const day = response.data.temp[key].slice(5, 15);
                        //debug console.log(value, day, "from main.js");
                        context.commit("setChart2", {
                            day: day,
                            value: value
                        });
                    }
                });
        },
        getData(context, payload) {
            let type = "";
            const chartLength = 25;
            const date = new Date();

            //context.commit("name", {payload}) - mutations
            context.commit("setTime", {
                time: `${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
                    }:${(date.getSeconds() < 10 ? '0' : '') + date.getSeconds()}`
            })

            // context.state.time;
            if (payload.type === "temperature") {
                type = "temperature"
            } else if (payload.type === "humidity") {
                type = "humidity"
            } else if (payload.type === "pressure") {
                type = "pressure";
            }
            axios
                .get(
                    'https://vue-http-908f5-default-rtdb.europe-west1.firebasedatabase.app/Chart.json'
                )
                .then((response) => {
                    if (type === "temperature") {
                        context.commit("setTemperature", {
                            data: response.data.temperature,
                        })

                        const chartArray1 = context.state.temperature.chart;
                        if (chartArray1.length > chartLength) {
                            context.commit("editChartTemperature");
                        }
                    } else if (type === "humidity") {
                        context.commit("setHumidity", {
                            data: response.data.humidity,
                        })
                        const chartArray2 = context.state.humidity.chart;
                        if (chartArray2.length > chartLength) {
                            context.commit("editChartHumidity");
                        }
                    } else if (type === "pressure") {
                        context.commit("setPressure", {
                            data: response.data.pressure,
                        })
                        const chartArray3 = context.state.pressure.chart;
                        if (chartArray3.length > chartLength) {
                            context.commit("editChartPressure");
                        }
                    }
                });
        },
        signUp(context, payload) {
            axios
                .post(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4H37PEw-gpUki2jU2r5WP8IadIh-r7ws',
                    {
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    context.commit("showSuccess");
                    context.commit("setUser", {
                        token: response.data.idToken,
                        userId: response.data.localId,
                        tokenExpiration: response.data.expiresIn
                    })
                    context.commit("toggleModalSignUp")
                    context.commit("showSuccess")
                })
                .catch((error) => {
                    context.commit("errorMessage", {
                        message: error.response.data.error.message
                    });
                    context.commit("showError");
                    console.log(error.response.data.error.message);

                });

        },
        logIn(context, payload) {
            axios
                .post(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4H37PEw-gpUki2jU2r5WP8IadIh-r7ws',
                    {
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    context.commit("showSuccess");
                    context.commit("setUser", {
                        token: response.data.idToken,
                        userId: response.data.localId,
                        tokenExpiration: response.data.expiresIn
                    })

                    setTimeout(() => { context.commit("toggleModalLogIn"), context.commit("showSuccess"); }, 1500)

                })
                .catch((error) => {
                    context.commit("errorMessage", {
                        message: error.response.data.error.message
                    });
                    context.commit("showError");
                    console.log(error.response.data.error.message);

                });


        },
    },
    getters: {
        token(state) {
            return state.token;
        },
        userId(state) {
            return state.userId;
        },
        temperatureNumber(state) {
            return state.temperature.data;
        },
        humidityNumber(state) {
            return state.humidity.data;
        },
        pressureNumber(state) {
            return state.pressure.data;
        },
        temperatureChart(state) {
            return state.temperature.chart;
        },
        humidityChart(state) {
            return state.humidity.chart;
        },
        pressureChart(state) {
            return state.pressure.chart;
        },
        chart2(state) {
            return state.chart2.chart;
        }
    }
});

const app = createApp(App);
app.use(VueChartkick);
app.use(router);
app.use(store);

app.mount('#app');
