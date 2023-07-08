export default class Exercise {
  constructor(config) {
    this.name = config.name;
    this.reps = config.reps;
    this.sets = config.sets;
  }

  NewExerciseRender() {
    return (
      <View>
        <Text>{this.name}</Text>
        <Text>{this.sets}</Text>
        <Text>{this.reps}</Text>
      </View>
    );
  }
}
