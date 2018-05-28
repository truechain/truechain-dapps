import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "ml-8": {
        "marginLeft": 8
    },
    "ml-10": {
        "marginLeft": 10
    },
    "ml-15": {
        "marginLeft": 15
    },
    "ml-20": {
        "marginLeft": 20
    },
    "w80": {
        "width": 80
    },
    "w100": {
        "width": 100
    },
    "w120": {
        "width": "120px !important"
    },
    "body-bg": {
        "position": "fixed",
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "100%",
        "zIndex": -10,
        "zoom": 1,
        "backgroundRepeat": "no-repeat",
        "backgroundSize": "cover",
        "WebkitBackgroundSize": "cover",
        "OBackgroundSize": "cover",
        "backgroundPosition": "center 0",
        "backgroundImage": "url(../images/bg.jpg)"
    },
    "headertitle": {
        "float": "center",
        "width": "100%",
        "height": 100,
        "lineHeight": 100,
        "textAlign": "center",
        "marginTop": 20
    },
    "header-logo": {
        "float": "left",
        "lineHeight": 100,
        "paddingLeft": 15
    },
    "header-create": {
        "float": "left",
        "width": 150,
        "height": 45,
        "lineHeight": 20,
        "fontSize": 18,
        "color": "#ffffff",
        "textAlign": "center",
        "borderColor": "#553300",
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderRadius": 3,
        "opacity": 0.8,
        "marginTop": 20,
        "marginLeft": 100,
        "backgroundColor": "#ff3300"
    },
    "headertitle span": {
        "float": "left",
        "height": 100,
        "lineHeight": 100,
        "fontSize": 18,
        "color": "#FFFFFF",
        "overflowY": "hidden",
        "overflowX": "scroll",
        "textAlign": "center"
    },
    "container": {
        "width": "100%",
        "minHeight": 380,
        "marginTop": 20
    },
    "game_box": {
        "width": 790,
        "height": 480,
        "paddingTop": 15,
        "paddingLeft": 10,
        "marginLeft": 25,
        "borderColor": "#737373",
        "borderWidth": 2,
        "borderStyle": "solid",
        "borderRadius": 3,
        "opacity": 0.8,
        "backgroundColor": "#ffffff"
    },
    "game_player_box": {
        "float": "left",
        "width": 220,
        "height": 360,
        "marginTop": 35,
        "marginLeft": 15,
        "borderColor": "#737373",
        "borderWidth": 2,
        "borderStyle": "solid",
        "borderRadius": 3,
        "backgroundColor": "#f3f3f3"
    },
    "game_player_title": {
        "width": "100%",
        "height": 45,
        "lineHeight": 35
    },
    "game_player_title span": {
        "display": "block",
        "width": "100%",
        "lineHeight": 45,
        "color": "#ff3300",
        "fontSize": 20,
        "textAlign": "center",
        "marginTop": 15
    },
    "game_player_image": {
        "width": 200,
        "height": 200,
        "textAlign": "center",
        "marginTop": 10,
        "marginLeft": 10
    },
    "game_player_image img": {
        "width": 165,
        "height": 165,
        "marginLeft": 0,
        "marginTop": 15,
        "borderColor": "#737373",
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderRadius": 3
    },
    "game_player_btn": {
        "width": 200,
        "height": 60,
        "textAlign": "center",
        "marginTop": 10,
        "marginLeft": 10
    },
    "game_player_btn button": {
        "width": 165,
        "height": 45,
        "color": "white",
        "fontSize": 18,
        "borderColor": "#737373",
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderRadius": 3,
        "outline": "none",
        "opacity": 1,
        "top": 10,
        "marginTop": 5,
        "backgroundColor": "#ff3300"
    },
    "game_status_box": {
        "float": "left",
        "width": 260,
        "height": 410,
        "textAlign": "center",
        "marginTop": 15,
        "marginLeft": 20,
        "marginRight": 5,
        "borderColor": "#737373",
        "borderWidth": 2,
        "borderStyle": "solid",
        "borderRadius": 3,
        "backgroundColor": "#f3f3f3"
    },
    "game_status_title": {
        "width": "100%",
        "height": 45,
        "lineHeight": 35,
        "marginTop": 15
    },
    "game_status_title span": {
        "display": "block",
        "width": "100%",
        "lineHeight": 45,
        "color": "#ff3300",
        "fontSize": 24,
        "textAlign": "center",
        "marginTop": 15
    },
    "game_status_image": {
        "width": 220,
        "height": 240,
        "textAlign": "center",
        "marginTop": 20,
        "marginLeft": 20
    },
    "game_status_image img": {
        "width": 160,
        "height": 220,
        "borderColor": "#737373",
        "borderWidth": 0,
        "borderStyle": "solid",
        "borderRadius": 3
    },
    "game_status_btn": {
        "width": 220,
        "height": 60,
        "textAlign": "center",
        "marginTop": 10,
        "marginLeft": 20
    },
    "game_status_btn button": {
        "width": 165,
        "height": 45,
        "color": "white",
        "fontSize": 18,
        "borderColor": "#737373",
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderRadius": 3,
        "outline": "none",
        "opacity": 1,
        "top": 10,
        "marginTop": 5,
        "backgroundColor": "#ff3300"
    }
});