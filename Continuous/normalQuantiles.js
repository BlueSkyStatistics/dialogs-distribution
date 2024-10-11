





class normalQuantiles extends baseModal {
    static dialogId = 'normalQuantiles'
    static t = baseModal.makeT(normalQuantiles.dialogId)

    constructor() {
        var config = {
            id: normalQuantiles.dialogId,
            label: normalQuantiles.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::qnorm(c({{selected.prob | safe}}), mean={{selected.mean | safe}}, sd={{selected.sd | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            prob: {
                el: new input(config, {
                    no: 'prob',
                    label: normalQuantiles.t('prob'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            mean: {
                el: new input(config, {
                    no: 'mean',
                    label: normalQuantiles.t('mean'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sd: {
                el: new input(config, {
                    no: 'sd',
                    label: normalQuantiles.t('sd'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: normalQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: normalQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: normalQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.prob.el.content, objects.mean.el.content, objects.sd.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: normalQuantiles.t('navigation'),
                icon: "icon-gaussian-function-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: normalQuantiles.t('help.title'),
            r_help: "help(data,package='utils')",
            body: normalQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new normalQuantiles().render()
}
