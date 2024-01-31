FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
COPY . .
RUN mvn clean package -DskipTests
FROM eclipse-temurin:21.0.2_13-jre
COPY --from=build /target/interactive_quiz-0.0.1-SNAPSHOT.jar interactive-quiz.jar
ENTRYPOINT [ "java","-jar","interactive_quiz.jar" ];