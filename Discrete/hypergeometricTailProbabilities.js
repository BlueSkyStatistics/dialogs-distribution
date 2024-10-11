





class hypergeometricTailProbabilities extends baseModal {
    static dialogId = 'hypergeometricTailProbabilities'
    static t = baseModal.makeT(hypergeometricTailProbabilities.dialogId)

    constructor() {
        var config = {
            id: hypergeometricTailProbabilities.dialogId,
            label: hypergeometricTailProbabilities.t('title'),
            modalType: "one",
            RCode: `
                    local(
                        {
                        result = stats::phyper(c({{selected.varvals | safe}}), m={{selected.m | safe}}, n={{selected.n | safe}}, k={{selected.k | safe}}, lower.tail={{selected.a | safe}})
                        print(result)
                        }
                        )                  
                `
        }
        var objects = {
            varvals: {
                el: new input(config, {
                    no: 'varvals',
                    label: hypergeometricTailProbabilities.t('varvals'),
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
                    label: hypergeometricTailProbabilities.t('m'),
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
                    label: hypergeometricTailProbabilities.t('n'),
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
                    label: hypergeometricTailProbabilities.t('k'),
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            }, 
            labelSig: { el: new labelVar(config, { label: hypergeometricTailProbabilities.t('labelSig'), style: "mt-3",h: 6 }) },
            lowtail: { el: new radioButton(config, { label: hypergeometricTailProbabilities.t('lowtail'), no: "a", increment: "TRUE", value: "TRUE", state: "checked", extraction: "ValueAsIs" }) },
            uptail: { el: new radioButton(config, { label: hypergeometricTailProbabilities.t('uptail'), no: "a", increment: "FALSE", value: "FALSE", state: "", extraction: "ValueAsIs" }) }            
        }
        const content = {
            items: [objects.varvals.el.content,objects.m.el.content, objects.n.el.content, objects.k.el.content, objects.labelSig.el.content, objects.lowtail.el.content, objects.uptail.el.content],
            nav: {
                name: hypergeometricTailProbabilities.t('navigation'),
                icon: "icon-curve-t",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        
        this.help = {
            title: hypergeometricTailProbabilities.t('help.title'),
            r_help: "help(data,package='utils')",
            body: hypergeometricTailProbabilities.t('help.body')
        }
;
    }
}

module.exports = {
    render: () => new hypergeometricTailProbabilities().render()
}
