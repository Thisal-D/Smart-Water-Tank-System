const SERVER_URL = 'http://192.168.159.24:5000';
const SYSTEM_CONTROL_BUTTON = document.getElementById("system-control-button")

const TANK_HEIGHT = 10;

let isSystemOn = false;
let isBuzzerOn = false;
let isLedOn = false;
let isPumpOn = false;
let isWaterLevelLow = false;
let isWaterLevelHigh = false;
let isPhValueBad = false;

let SystemStates = "OFF";
let buzzer_status = "OFF";
let pump_status = "OFF";
let led_status = "OFF"; 
let distance_to_water = 0;
let water_ph_value = 0;

async function fetchStatus() {
    try {
        const response = await fetch(`${SERVER_URL}/status`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        isSystemOn =  data.system_status;
        isBuzzerOn = data.buzzer_status;
        isLedOn = data.led_status;
        isPumpOn = data.pump_status;
        isWaterLevelLow = data.water_level_low;
        isPhValueBad = data.ph_value_bad;


        document.getElementById('buzzerStatus').textContent = data.buzzer_status;
        document.getElementById('pumpStatus').textContent = data.pump_status;
        document.getElementById('ledStatus').textContent = data.led_status;
        document.getElementById('distanceToWater').textContent = data.distance_to_water;
        document.getElementById('waterPhValue').textContent = data.water_ph_value;
        console.log("Data:", data);
    } catch (error) {
        console.error('Error fetching status:', error);
    }
}

async function toggleSystem() {
    try {
        const response = await fetch(`${SERVER_URL}/toggle`, { method: 'POST' });
    } catch (error) {
        console.error('Error toggling system:', error);
    }
}


SYSTEM_CONTROL_BUTTON.addEventListener("click", toggleSystem)

setInterval(fetchStatus, 1000);

fetchStatus();
