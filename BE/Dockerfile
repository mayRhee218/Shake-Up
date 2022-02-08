FROM openjdk:11-jre
COPY build/lib/docker-test-*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]