export default function (props) {
    console.log(props.activeStep);
    console.log(props.children[props.activeStep]);
    return props.children[props.activeStep];
}
