# 🧠 AI Benefits

Vamos a:
✅ Usar un LLM para 3 casos: ranking, recomendación y mejoras.  
✅ Practicar cómo escribir prompts que logren el resultado esperado.  
✅ Ver los resultados que puede darnos la AI.

---

## 🚀 Cómo levantarlo con Docker

1. Configurá tu clave en un archivo `.env` en la raíz:
```
OPENROUTER_API_KEY=tu_api_key
```
Una vez la carguen ejecutar ```export $(cat .env | xargs)``` y luego
``` echo $OPENROUTER_API_KEY```  para verificar que quedo cargada la key.

Para verificar que tienene acceso al modelo pueden ir a 
```
curl --location 'https://openrouter.ai/api/v1/chat/completions' \
--header 'Authorization: Bearer OPENROUTER_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "deepseek/deepseek-r1:free",
    "messages": [{"role":"user", "content":"Hola, ¿cómo estás?"}]
  }'
```



2. Abre docker desktop y levantá los servicios:
```
docker-compose up --build
```

3. API disponible en `http://localhost:3000`.

---

## 🔍 Endpoints

- `POST /ranking`
- `POST /best-benefit`
- `POST /improve-benefit`

Todos esperan:
```json
{ "prompt": "Tu prompt aquí" }
```

¡Listo para que lo prueben y aprendan iterando!
