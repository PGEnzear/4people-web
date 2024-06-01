export enum ERROR_CODES {
    
    //запрос на сервер совершает не с приложения телеграмма
    "UNAUTHORIZED" = "UNAUTHORIZED",

    //
    "USER_ALREADY_EXISTS" = "USER_DOES_NOT_EXISTS",

    //пользователь, которые отправил запрос не найден в базе данных,
    "USER_DOES_NOT_EXIST" = "USER_DOES_NOT_EXIST",

    //комнаты в которой пользователь пытается совершить действие несуществует/пользователь не может с ней взаимодействовать(не является её участником)
    "ROOM_DOES_NOT_EXIST" = "ROOM_DOES_NOT_EXIST",

    //пользователь находится уже в другой комнате, нельзя создать свою или зайти в другую
    "IN_ANOTHER_ROOM" = "IN_ANOTHER_ROOM",

    //нельзя выйти из комнаты во время игры    
    "CANT_DISCONNECT_IN_PROGRESS_GAME" = "CANT_DISCONNECT_IN_PROGRESS_GAME",

    //
    "IN_ROOM" = "IN_ROOM",

    //
    "NOT_ENOUGH_MONEY" = "NOT_ENOUGH_MONEY",

    //пользователь пытается совершить ход не в свою очередь
    "NOT_YOUR_TURN" = "NOT_YOUR_TURN",

    //ошибка сервера
    "SERVER_ERROR" = "SERVER_ERROR",

    //неверное тело запроса
    "INVALID_BODY" = "INVALID_BODY"

}