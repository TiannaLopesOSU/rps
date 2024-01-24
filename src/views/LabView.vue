<template>
  <div class="container my-3">
    <div class="badge textbook-color d-flex justify-content-end">
      <div class="course rounded p-1">
        ECE 375 - Computer Organization and Assembly Language Programming
      </div>
    </div>
    <div
      class="header course border-2 rounded textbook-color d-flex justify-content-center"
    >
      <h1 class="mx-1">Lab 7 - Remotely Communicated Rock Paper Scissors</h1>
    </div>
    <div class="body mt-2 border border-2 rounded">
      <div class="m-4">
        <div class="course rounded m-1 card">
          <div class="card-header">
            <div
              class="textbook-color fs-5 fw-bold d-flex justify-content-center"
            >
              SECTION OVERVIEW
            </div>
          </div>
          <div class="fw-bold">Complete the following objectives:</div>
          <div>
            <ul>
              <li>
                Write an assembly program (for two separate mega32 boards) and
                have them interact.
              </li>
              <li>
                Learn how to configure and use the
                <span class="fst-italic">
                  Universal Synchronous/ Asynchronous Receiver/
                  Transmitter</span
                >
                (USART) module on the AT mega32u4 microcontroller.
              </li>
              <li>
                Learn how to configure and use the 16 bit Timer/ Counter1 module
                to generate a 1.5-sec delay.
              </li>
            </ul>
          </div>
        </div>
        <div class="course rounded my-3 card">
          <div class="card-header">
            <div
              class="textbook-color fs-5 fw-bold d-flex justify-content-center"
            >
              BACKGROUND
            </div>
          </div>
          <div class="card-body">....</div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="card m-2 course">
            <div class="card-header">
              <div
                class="textbook-color fs-5 fw-bold d-flex justify-content-center"
              >
                IMPLEMENTATION
              </div>
            </div>
            <div class="card-body">
              <div v-for="step in instructionStepList" :key="step.id">
                <!-- <div>{{ step.title }}</div> -->
                <div v-if="step.id === currentStepIndex">
                  <div>{{ step.instruction }}</div>
                  <div class="border rounded p-1 m-1">
                    <div v-for="(view, index) in step.content" :key="index">
                      <div class="text-red">{{ view }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer text-end">
              <button class="btn btn-primary" @click="nextStepId">Next</button>
            </div>
          </div>
        </div>
        <div class="col-8">
          <div class="card m-2 course">
            <div class="card-header">
              <div
                class="textbook-color fs-5 fw-bold d-flex justify-content-center"
              >
                AVR - mega32u4
              </div>
            </div>
            <div class="card-body"><Board /></div>
            <div class="card-footer"></div>
          </div>
          <div class="card m-2">
            <div class="card-header">
              <div
                class="textbook-color fs-5 fw-bold d-flex justify-content-center"
              >
                STARTER CODE
              </div>
            </div>
            <div class="card-body">
              <Codemirror
                class="cm-s-base16-dark"
                v-model="code"
                :options="editorOptions"
              ></Codemirror>
            </div>
            <div class="card-footer"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import instructionSteps from "@/data/lab7Implementation.json";
import Board from "@/components/BoardComponent.vue";
import { Codemirror } from "vue-codemirror";

export default {
  name: "LabView",
  data() {
    return {
      instructionStepList: instructionSteps,
      currentStepIndex: 0,
      code: "// Write your code here\n",
      editorOptions: {
        tabSize: 4,
        mode: "javascript",
        theme: "base16-dark",
      },
    };
  },
  components: { Codemirror, Board },
  props: {},
  methods: {
    nextStepId() {
      this.currentStepIndex++;
    },
  },
};
</script>
<style scoped>
.textbook-color {
  color: #800080;
}
.course {
  border: 1px solid #800080;
  border: rounded;
}
.text-red {
  color: red;
  font-family: monospace;
}
</style>
