





class hypergeometricQuantiles extends baseModal {
    static dialogId = 'hypergeometricQuantiles'
    static t = baseModal.makeT(hypergeometricQuantiles.dialogId)

    constructor() {
        var config = {
            id: hypergeometricQuantiles.dialogId,
            label: hypergeometricQuantiles.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::qhyper(c({{selected.varvals | safe}}), m={{selected.m | safe}}, n={{selected.n | safe}}, k={{selected.k | safe}}, lower.tail={{selected.a | safe}})
                        print(result)
                        }
                        )                  
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: hypergeometricQuantiles.t('varvals'),
                    required: true,
                    placeholder: "",
                    extraction: "TextAsIs",
                    allow_spaces:true,
                    value: ""
                })
            },            
            m: {
                el: new input(config, {
                    no: 'm',
                    label: hypergeometricQuantiles.t('m'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",                    
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            n: {
                el: new input(config, {
                    no: 'n',
                    label: hypergeometricQuantiles.t('n'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            },
            k: {
                el: new input(config, {
                    no: 'k',
                    label: hypergeometricQuantiles.t('k'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            }, 
            labelSig: { el: new labelVar(config, { label: hypergeometricQuantiles.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: hypergeometricQuantiles.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: hypergeometricQuantiles.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }            
        }
        const content = {
            items: [objects.varvals.el.content,objects.m.el.content, objects.n.el.content, objects.k.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: hypergeometricQuantiles.t('navigation'),
                icon: "icon-curve-q",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: hypergeometricQuantiles.t('help.title'),
            r_help: "help(data,package='utils')",
            body: hypergeometricQuantiles.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new hypergeometricQuantiles().render()
}
