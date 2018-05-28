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
    "header-setting": {
        "float": "right",
        "width": 50,
        "height": 50,
        "lineHeight": 20,
        "fontSize": 14,
        "color": "#ffffff",
        "textAlign": "center",
        "borderColor": "#553300",
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderRadius": 25,
        "opacity": 0.6,
        "marginTop": 10,
        "marginRight": 10,
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
        "minHeight": "38\t0px",
        "marginTop": 20
    },
    "game_box": {
        "width": 340,
        "height": 330,
        "paddingTop": 5,
        "paddingLeft": 5,
        "marginLeft": 75,
        "borderColor": "#373737",
        "borderWidth": 2,
        "borderStyle": "solid",
        "borderRadius": 3,
        "opacity": 0.8
    },
    "game_info_box": {
        "width": 500,
        "height": 150,
        "opacity": 0.9,
        "backgroundColor": "#ddddff"
    },
    "game_player_box": {
        "float": "left",
        "width": 120,
        "height": 150
    },
    "game_player_box span": {
        "display": "block",
        "width": "100%",
        "lineHeight": 30,
        "color": "#ff3300",
        "fontSize": 20,
        "textAlign": "center"
    },
    "game_player_box img": {
        "width": 100,
        "height": 100,
        "marginLeft": 10,
        "marginTop": 10,
        "borderColor": "#373737",
        "borderWidth": 1,
        "borderStyle": "solid",
        "borderRadius": 3
    },
    "game_status_box": {
        "float": "left",
        "width": 260,
        "height": 120,
        "textAlign": "center"
    },
    "game_status_box span": {
        "display": "block",
        "width": 260,
        "lineHeight": 80,
        "color": "#ff3300",
        "fontSize": 22
    },
    "game_status_box button": {
        "width": 120,
        "height": 40,
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
    "game_box_row": {
        "width": "100%",
        "height": 100,
        "marginTop": 5
    },
    "game_box_column": {
        "float": "left",
        "width": 100,
        "height": 100,
        "marginLeft": 5,
        "borderColor": "#373737",
        "borderWidth": 2,
        "borderStyle": "solid",
        "borderRadius": 3,
        "opacity": 0.9
    },
    "game_box_btn": {
        "width": 100,
        "height": 100,
        "outline": "none",
        "backgroundColor": "#ddddff"
    },
    "game_control_panel": {
        "width": 500,
        "height": 120,
        "lineHeight": 100,
        "marginTop": 15,
        "backgroundColor": "#ddddff"
    },
    "game_control_btn_reset": {
        "width": 120,
        "height": 40,
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
        "marginLeft": 15,
        "backgroundColor": "#ff3300"
    }
});