# test_task_green_api

Инструкция по локальному развертыванию проекта:

1. Скопировать репозиторий (git clone git@github.com:Gamabuntoz/test_task_green_api)
2. Из корневой папки проекта выполнить в терминале команду "docker compose up" (На устройстве должен быть установлен Docker Desktop)

Проект из двух микросервисов и RabbitMQ будет запущен из докер-контейнера.
Первый микросервис (gateway) будет работать на локальном хосте по порту 5000, второй микросервис (user) по порту 3000.
RabbitMQ будет работать на локальном хосте по порту 15672 для веб-интерфейса и по порту 5672 для amqp.


Для отправки тестового асинхронного HTTP запроса, нужно использовать PUT запрос на адрес http://localhost:5000/gateway/users/1

Все логи работы api сохраняются в локальные файлы .log в корневые папки микросервисов.
Для прочтения логов можно использовать GET запросы на адреса:
1. http://localhost:5000/gateway/log - Для доступа к логам с информацией о работе первого микросервиса
2. http://localhost:5000/gateway/error-log - Логи с ошибками работы перового микросервиса
3. http://localhost:5000/gateway/users/log - Логи с информацией о работе второго микросервиса
4. http://localhost:5000/gateway/users/error-log - Логи с ошибками работы второго микросервиса
