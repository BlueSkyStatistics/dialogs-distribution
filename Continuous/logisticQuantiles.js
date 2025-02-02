





class logisticQuantiles extends baseModal {
    static dialogId = 'logisticQuantiles'
    static t = baseModal.makeT(logisticQuantiles.dialogId)

    constructor() {
        var config = {
            id: logisticQuantiles.dialogId,
            label: logisticQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::qlogis(c({{selected.prob | safe}}), location={{selected.location | safe}}, scale={{selected.scale | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: logisticQuantiles.t('prob'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            location: {
                el: new input(config, {
                    no: 'location',
                    label: logisticQuantiles.t('location'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            scale: {
                el: new input(config, {
                    no: 'scale',
                    label: logisticQuantiles.t('scale'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: logisticQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: logisticQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: logisticQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.location.el.content, objects.scale.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: logisticQuantiles.t('navigation'),
                icon: "icon-logistic_white_comp-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: logisticQuantiles.t('help.title'),
            r_help: logisticQuantiles.t('help.r_help'),  //r_help: "help(data,package='utils')",
            body: logisticQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new logisticQuantiles().render()
}
