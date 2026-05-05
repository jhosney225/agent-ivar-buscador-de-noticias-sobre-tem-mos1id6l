
```javascript
import Anthropic from "@anthropic-ai/sdk";
import * as readline from "readline";

const client = new Anthropic();

const conversationHistory = [];

async function searchNews(topic) {
  console.log(`\nBuscando noticias sobre: ${topic}...\n`);

  conversationHistory.push({
    role: "user",
    content: `Busca y proporciona un resumen de las noticias más recientes y relevantes sobre "${topic}". 
    
    Por favor incluye:
    1. Tres titulares principales sobre este tema
    2. Un breve resumen de cada noticia (2-3 oraciones)
    3. La importancia o relevancia de estas noticias
    4. Palabras clave relacionadas para futuras búsquedas
    
    Formatea la respuesta de manera clara y estructurada.`,
  });

  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: `Eres un experto buscador de noticias. Tu rol es ayudar a usuarios a encontrar y entender noticias sobre temas de su interés. 
      Proporciona información precisa, relevante y bien estructurada. Mantén un registro de los temas buscados anteriormente para hacer sugerencias útiles.
      Aunque no tengas acceso a internet en tiempo real, puedes proporcionar análisis y contexto sobre los temas solicitados basado en tu conocimiento.`,
      messages: conversationHistory,
    });

    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    conversationHistory.push({
      role: "assistant",
      content: assistantMessage,
    });

    return assistantMessage;
  } catch (error) {
    console.error("Error al buscar noticias:", error);
    throw error;
  }
}

async function getNewsSuggestions() {
  console.log("\nObteniendo sugerencias de temas de noticias...\n");

  conversationHistory.push({
    role: "user",
    content: `Basándote en los temas que he buscado anteriormente, sugiere 5 temas de noticias que podrían serme de interés.
    Para cada sugerencia incluye:
    1. El nombre del tema
    2. Por qué crees que sería interesante basándote en mi historial
    3. Palabras clave relacionadas
    
    Si es la primera búsqueda, sugiere temas de noticias populares y relevantes.`,
  });

  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: `Eres un experto buscador de noticias. Tu rol es ayudar a usuarios a encontrar y entender noticias sobre temas de su interés. 
      Proporciona información precisa, relevante y bien estructurada. Mantén un registro de los temas buscados anteriormente para hacer sugerencias útiles.`,
      messages: conversationHistory,
    });

    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    conversationHistory.push({
      role: "assistant",
      content: assistantMessage,
    });

    return assistantMessage;
  } catch (error) {
    console.error("Error al obtener sugerencias:", error);
    throw error;
  }
}

async function compareTopics(topic1, topic2) {
  console.log(`\nComparando noticias sobre: ${topic1} vs ${topic2}...\n`);

  conversationHistory.push({
    role: "user",
    content: `Compara las noticias y temas relacionados con "${topic1}" y "${topic2}".
    
    Por favor incluye:
    1. Similitudes entre ambos temas
    2. Diferencias principales
    3. Cómo se relacionan entre sí
    4. Qué tema es más relevante actualmente
    5. Noticias recientes que conectan ambos temas
    
    Presenta la comparación de forma clara y estructurada.`,
  });

  try {
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: `Eres un experto buscador de noticias. Tu rol es ayudar a usuarios a encontrar y entender noticias sobre temas de su interés. 
      Proporciona información precisa, relevante y bien estructurada. Mantén un registro de los temas buscados anteriormente para hacer sugerencias útiles.`,
      messages: conversationHistory,
    });

    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    conversationHistory.push({
      role: "assistant",
      content: assistantMessage,
    });

    return assistantMessage;
  } catch (error) {
    console.error("Error al comparar temas:", error);
    throw error;
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) => {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  };

  console.log("=================================");
  console.log("  BUSCADOR DE NOTICIAS INTELIGENTE");
  console.log("=================================");
  console.log(
    "\nBienvenido al Buscador de Noticias. Puedes realizar búsquedas sobre temas de tu interés."
  );
  console.log("\nOpciones disponibles:");