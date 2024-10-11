





class lognormalProbabilities extends baseModal {
    static dialogId = 'lognormalProbabilities'
    static t = baseModal.makeT(lognormalProbabilities.dialogId)

    constructor() {
        var config = {
            id: lognormalProbabilities.dialogId,
            label: lognormalProbabilities.t('title'),
            modalType: "one",
            RCode: `
            local(
                {
                result =  stats::plnorm(c({{selected.varvals | safe}}), meanlog={{selected.meanlog | safe}}, sdlog={{selected.sdlog | safe}}, lower.tail={{selected.a | safe}} )
                print(result)
                }
                )
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: lognormalProbabilities.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },
            meanlog: {
                el: new input(config, {
                    no: 'meanlog',
                    label: lognormalProbabilities.t('meanlog'),
                    required: true,
                    placeholder: "0",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "0"
                })
            },
            sdlog: {
                el: new input(config, {
                    no: 'sdlog',
                    label: lognormalProbabilities.t('sdlog'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            labelSig: { el: new labelVar(config, { label: lognormalProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: lognormalProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: lognormalProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }
        }
        const content = {
            items: [objects.varvals.el.content, objects.meanlog.el.content, objects.sdlog.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: lognormalProbabilities.t('navigation'),
                icon: "icon-log-normal-distribution-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: lognormalProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: lognormalProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new lognormalProbabilities().render()
}
