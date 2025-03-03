/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var localization = {
    en: {
        title: "Hypergeometric Probabilities",
        navigation: "Hypergeometric Probabilities",
        m: "m (number of white balls in the urn)",
        n: "n (number of black balls in the urn)",
        k: "k (number of balls drawn from the urn)",
        help: {
            title: "Hypergeometric Probabilities",
            r_help: "help(dhyper, package=stats)",
            body: `

            <b>Description</b>
            <br/>
            Density, distribution function, quantile function and random generation for the hypergeometric distribution.
            <br/>
            <b>Usage</b>
            <br/>
            <code>
                dhyper(x, m, n, k, log = FALSE)
                <br/>
                phyper(q, m, n, k, lower.tail = TRUE, log.p = FALSE)
                <br/>
                qhyper(p, m, n, k, lower.tail = TRUE, log.p = FALSE)
                <br/>
                rhyper(nn, m, n, k)
                <br/>
            </code>
            <br/>
            <b>Arguments</b>
            <br/>
            <ul>
                <li>x, q : vector of quantiles representing the number of white balls drawn without replacement from an urn which contains both black and white balls.</li>
                
                
                <li>m : the number of white balls in the urn.</li>
                
                
                <li>n : the number of black balls in the urn.</li>
                
                
                <li>k : the number of balls drawn from the urn.</li>
                
                
                <li>p : probability, it must be between 0 and 1.</li>
                
                
                <li>nn : number of observations. If length(nn) > 1, the length is taken to be the number required.</li>
                
                
                <li>log, log.p : logical; if TRUE, probabilities p are given as log(p).</li>
                
                
                <li>lower.tail : logical; if TRUE (default), probabilities are P[X ≤ x], otherwise, P[X > x].</li>
            </ul>
            
            
            
            <br/>
            <b>Details</b>
            <br/>
            The hypergeometric distribution is used for sampling without replacement. The density of this distribution with parameters m, n and k (named Np, N-Np, and n, respectively in the reference below) is given by
            <br/>
            <code>
                p(x) = choose(m, x) choose(n, k-x) / choose(m+n, k)
                for x = 0, …, k.
            </code>
            <br/>
            Note that p(x) is non-zero only for max(0, k-n) <= x <= min(k, m).
            <br/>
            With p := m/(m+n) (hence Np = N \times p in the reference's notation), the first two moments are mean
            <br/>
            <code>E[X] = μ = k p</code>
            <br/>
            and variance
            <br/>
            <code>Var(X) = k p (1 - p) * (m+n-k)/(m+n-1),</code>
            <br/>
            which shows the closeness to the Binomial(k,p) (where the hypergeometric has smaller variance unless k = 1).
            <br/>
            The quantile is defined as the smallest value x such that F(x) ≥ p, where F is the distribution function.
            <br/>
            If one of m, n, k, exceeds .Machine$integer.max, currently the equivalent of qhyper(runif(nn), m,n,k) is used, when a binomial approximation may be considerably more efficient.
            <br/>
            <br/><b>Value</b>
            <br/>
            dhyper gives the density, phyper gives the distribution function, qhyper gives the quantile function, and rhyper generates random deviates.
            <br/>
            Invalid arguments will result in return value NaN, with a warning.
            <br/>
            The length of the result is determined by n for rhyper, and is the maximum of the lengths of the numerical arguments for the other functions.
            <br/>
            The numerical arguments other than n are recycled to the length of the result. Only the first elements of the logical arguments are used.            
`}
    }
}




class hypergeometricProbabilities extends baseModal {
    constructor() {
        var config = {
            id: "hypergeometricProbabilities",
            label: localization.en.title,
            modalType: "one",
            RCode: `
                    local(
                        {
                        .Table <- data.frame(Probability=stats::dhyper(1:2, m={{selected.m | safe}}, n={{selected.n | safe}}, k={{selected.k | safe}}))
                          rownames(.Table) <- (1:2)
                        BSkyFormat(.Table, singleTableOutputHeader="Results of Hypergeometric Probabilities")
                        }
                        )                    
                `
        }
        var objects = {
            m: {
                el: new input(config, {
                    no: 'm',
                    label: localization.en.m,
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
                    label: localization.en.n,
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
                    label: localization.en.k,
                    required: true,
                    placeholder: "1",
                    allow_spaces:true,
                    type : "numeric",
                    extraction: "TextAsIs",
                    value: "1"
                })
            }
        }
        const content = {
            items: [objects.m.el.content, objects.n.el.content, objects.k.el.content],
            nav: {
                name: localization.en.navigation,
                icon: "icon-curve-p",
                datasetRequired: false,
                modal: config.id
            }
        }
        super(config, objects, content);
        this.help = localization.en.help;
    }
}
module.exports.item = new hypergeometricProbabilities().render()