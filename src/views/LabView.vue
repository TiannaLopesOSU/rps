<template>
  <div class="container my-3">
    <div class="badge textbook-color d-flex justify-content-end">
      <div class="course rounded p-1 fs-5">
        ECE 375 - Computer Organization and Assembly Language Programming
      </div>
    </div>
    <div class="header textbook-color d-flex justify-content-center mt-4">
      <h1 class="mx-1">Lab 7 - Remotely Communicated Rock Paper Scissors</h1>
    </div>
    <div v-if="showIntroduction">
      <div class="course rounded my-3 card">
        <div class="card-header">
          <div
            class="textbook-color fs-5 fw-bold d-flex justify-content-center"
          >
            BACKGROUND
          </div>
        </div>
        <div class="card-body">
          <p>
            As previous labs have demonstrated, microcontrollers are well-suited
            for tasks such as: receiving user input and generating output via
            general-purpose I/O (GPIO) ports, performing arithmetic and logic
            computations, and accurately measuring intervals of time. However,
            microcontrollers are also frequently used for tasks that require
            communication with the "outside world" , which for our purposes
            means anything that exists outside of the mega32U4 board.
          </p>
          <p>
            When using a microcontroller to interact with the outside world, it
            is very convenient to have a structured,
            <span class="fst-italic">standardized</span> way of exchanging
            information, as opposed to manually implementing data transfer using
            the GPIO ports. For this reason, microcontrollers often implement a
            variety of
            <span class="fst-italic">communication protocols.</span>
          </p>
          <p>
            Communication protocols come in two varieties:
            <span class="fst-italic">parallel</span> and
            <span class="fst-italic">serial</span>. Parallel communication
            protocols are typically used for internal microcontroller
            communication, such as a shared data bus.Serial communication
            protocols are more commonly used for external interactions. Some
            common examples of serial protocols are
            <span class="fst-italic">Serial Peripheral Interface</span> (SPI)
            and <span class="fst-italic">Two-wire Serial Interface</span> (TWI).
          </p>
          <p>
            The ATmega32U4 microcontroller, in addition to providing built-in
            modules for both SPI and TWI, also comes with
            <span class="fst-italic"
              >Universal Synchronous/ Asynchronous Receiver/ Transmitter</span
            >
            (USART) modules. USART is not a communication protocol; instead it
            is a highly-configurable hardware module that can be set up to
            implement point-to-point serial communication (with various parity,
            data rate, and frame format settings). If two microcontrollers each
            have a USART module, then they can perform
            <span class="fst-italic">full-duplex</span> serial communication as
            long as their respective USART modules are configured with the same
            settings, and as long as there is a physical interface (wired) that
            links their respective TX/RX pins.
            <span class="fw-bold"
              >Specifically, TX and RX pins in a board need to be wired with RX
              and TX pins in the other board, respectively. GND pins in both
              boards also need to be connected
            </span>
          </p>
          <div class="d-flex justify-content-center">
            <table>
              <th>Board 1</th>
              <th>Board 2</th>
              <tr>
                <td>PD2 &rarr;</td>
                <td>PD3</td>
              </tr>
              <tr>
                <td>PD3 &rarr;</td>
                <td>PD2</td>
              </tr>
              <tr>
                <td>PD.gnd &rarr;</td>
                <td>PD.gnd</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="card-footer text-end">
          <button class="btn course textbook-color m-2" @click="beginLab">
            Begin Lab
          </button>
        </div>
      </div>
    </div>
    <div v-else>
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
                  Learn how to configure and use the 16 bit Timer/ Counter1
                  module to generate a 1.5-sec delay.
                </li>
              </ul>
            </div>
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
                    <div
                      v-if="step.content.length > 0"
                      class="border rounded p-1 m-1"
                    >
                      <div v-for="(view, index) in step.content" :key="index">
                        <div class="text-red">{{ view }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer text-end">
                <div
                  v-if="this.currentStepIndex < this.instructionStepList.length"
                >
                  <button class="btn btn-primary" @click="nextStepId">
                    Next
                  </button>
                </div>
                <div v-else>
                  <button class="btn btn-secondary">Steps complete!</button>
                </div>
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
      showIntroduction: true,
      currentStepIndex: 1,
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
    beginLab() {
      this.showIntroduction = false;
    },
    nextStepId() {
      if (this.currentStepIndex < this.instructionStepList.length) {
        this.currentStepIndex++;
      }
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
