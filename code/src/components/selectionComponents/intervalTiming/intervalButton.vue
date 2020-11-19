<template>
    <div>
         <selection-button
         :text="displayNumber"
         :id="'time' + buttonNumber" 
         @click.native="updateTimeInterval(displayNumber)"
         />
    </div>
</template>

<script>
import selectionButton from '../../commonComponents/selectionButton.vue'

export default {
    name: 'intervalButton',
    components: {
        selectionButton
    },
    props: {
        buttonNumber: String
    },
    data() {
        return {
            isMounted: false
        }
    },
    methods: {
        roundUp(value) {
            return Math.round(this.scaleFactor * value)
        },
        updateTimeInterval(timeValue) {
            const payload = {
                interval: this.intervalSelected,
                time: parseInt(timeValue)
                }
            this.$store.dispatch('updatedSelectedTime', payload)
        }
    },
    computed: {
        scaleFactor() {
            if (this.isMounted) return this.$parent.scaleFactor
        },
        displayNumber() {
            return this.roundUp(this.buttonNumber).toString()
        },
        intervalSelected() {
            return this.$store.state.timeIntervalSelect
        }
    },
    mounted() {
        this.isMounted = true
    }
}
</script>

<style>
#time1 {
    text-align: center;
    position: relative;
    top: 1.5%;
}

#time2 {
    position: relative;
    right: -0%;
    top: 50%;
}

#time3 {
    position: relative;
    right: -43%;
    top: 50%;
}

#time10 {
    position: relative;
    top: 70%;
    left: 1.5%;
}

#time4 {
    position: relative;
    top: 70%;
    right: -67%;
}

#time9 {
    position: relative;
    left: 23%;
    top: 5%;
}

#time8 {
    position: relative;
    left: 65%;
    top: 8%;
}

#time7 {
    text-align: center;
    position: relative;
    top: 157%;
}


#time5 {
    position: relative;
    right: -45%;
    top: 5%;
}

#time6 {
    position: relative;
    right: -0%;
    top: 13%;
}

#time11 {
    position: relative;
    left: 22%;
    top: 155%;
}

#time12 {
    position: relative;
    left: 65%;
    top: -50%;
}
</style>