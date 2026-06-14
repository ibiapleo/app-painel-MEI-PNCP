import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Button from '@/components/Button/Button';
import { tokens } from '@/theme';

interface TermsModalProps {
  visible: boolean;
  onCancel: () => void;
  onAccept: () => void;
}

export default function TermsModal({ visible, onCancel, onAccept }: TermsModalProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    
    if (isCloseToBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Termos de Uso e Privacidade</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
                <Ionicons name="close" size={22} color={tokens.colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              onScroll={handleScroll}
              scrollEventThrottle={400}
              showsVerticalScrollIndicator={true}
            >
              <Text style={styles.sectionTitle}>1. Termos</Text>
            <Text style={styles.paragraph}>
              Ao acessar ao site LicitaFácil, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </Text>

            <Text style={styles.sectionTitle}>2. Uso de Licença</Text>
            <Text style={styles.paragraph}>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site LicitaFácil, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </Text>
            <Text style={styles.listItem}>• Modificar ou copiar os materiais</Text>
            <Text style={styles.listItem}>• Usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial)</Text>
            <Text style={styles.listItem}>• Tentar descompilar ou fazer engenharia reversa de qualquer software contido no site LicitaFácil</Text>
            <Text style={styles.listItem}>• Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais</Text>
            <Text style={styles.listItem}>• Transferir os materiais para outra pessoa ou 'espelhar' os materiais em qualquer outro servidor</Text>
            
            <Text style={styles.paragraph}>
              Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por LicitaFácil a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.
            </Text>

            <Text style={styles.sectionTitle}>3. Isenção de responsabilidade</Text>
            <Text style={styles.listItem}>
              • Os materiais no site da LicitaFácil são fornecidos 'como estão'. LicitaFácil não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
            </Text>
            <Text style={styles.listItem}>
              • Além disso, o LicitaFácil não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
            </Text>

            <Text style={styles.sectionTitle}>4. Limitações</Text>
            <Text style={styles.paragraph}>
              Em nenhum caso o LicitaFácil ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em LicitaFácil, mesmo que LicitaFácil ou um representante autorizado da LicitaFácil tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.
            </Text>

            <Text style={styles.sectionTitle}>5. Precisão dos materiais</Text>
            <Text style={styles.paragraph}>
              Os materiais exibidos no site da LicitaFácil podem incluir erros técnicos, tipográficos ou fotográficos. LicitaFácil não garante que qualquer material em seu site seja preciso, completo ou atual. LicitaFácil pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, LicitaFácil não se compromete a atualizar os materiais.
            </Text>

            <Text style={styles.sectionTitle}>6. Links</Text>
            <Text style={styles.paragraph}>
              O LicitaFácil não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por LicitaFácil do site. O uso de qualquer site vinculado é por conta e risco do usuário.
            </Text>

            <Text style={styles.sectionTitle}>Modificações</Text>
            <Text style={styles.paragraph}>
              O LicitaFácil pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
            </Text>

            <Text style={styles.sectionTitle}>Lei aplicável</Text>
            <Text style={styles.paragraph}>
              Estes termos e condições são regidos e interpretados de acordo com as leis do LicitaFácil e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Política de Privacidade</Text>
            <Text style={styles.paragraph}>
              A sua privacidade é importante para nós. É política do LicitaFácil respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site LicitaFácil, e outros sites que possuímos e operamos.
            </Text>
            <Text style={styles.paragraph}>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </Text>
            <Text style={styles.paragraph}>
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </Text>
            <Text style={styles.paragraph}>
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </Text>
            <Text style={styles.paragraph}>
              O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
            </Text>
            <Text style={styles.paragraph}>
              Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
            </Text>
            <Text style={styles.paragraph}>
              O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto conosco.
            </Text>

            <Text style={styles.listItem}>
              • O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
            </Text>
            <Text style={styles.listItem}>
              • Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
            </Text>
            <Text style={styles.listItem}>
              • Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
            </Text>
            <Text style={styles.listItem}>
              • Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.
            </Text>

            <Text style={styles.sectionTitle}>Compromisso do Usuário</Text>
            <Text style={styles.paragraph}>
              O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o LicitaFácil oferece no site e com caráter enunciativo, mas não limitativo:
            </Text>
            <Text style={styles.listItem}>
              • Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública
            </Text>
            <Text style={styles.listItem}>
              • Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos
            </Text>
            <Text style={styles.listItem}>
              • Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do LicitaFácil, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados
            </Text>

            <Text style={styles.sectionTitle}>Mais informações</Text>
            <Text style={styles.paragraph}>
              Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
            </Text>
            <Text style={styles.paragraph}>
              Esta política é efetiva a partir de 14 de junho de 2026.
            </Text>
          </ScrollView>

          <View style={styles.footer}>
            {!hasScrolledToBottom && (
              <Text style={styles.warningText}>
                Role até o final para aceitar os termos
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Recusar</Text>
              </TouchableOpacity>
              <View style={styles.acceptButton}>
                <Button 
                  title="Aceitar" 
                  onPress={onAccept} 
                  size="md" 
                  disabled={!hasScrolledToBottom}
                />
              </View>
            </View>
          </View>
        </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    width: '95%',
    height: '90%',
    maxWidth: 600,
  },
  card: {
    flex: 1,
    backgroundColor: tokens.colors.neutral[50],
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: tokens.colors.neutral[50],
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.neutral[200],
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: tokens.colors.text.primary,
    marginRight: 12,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.neutral[100],
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: tokens.colors.neutral[50],
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: tokens.colors.text.primary,
    marginTop: 16,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 21,
    color: tokens.colors.text.secondary,
    marginBottom: 14,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 21,
    color: tokens.colors.text.secondary,
    marginBottom: 8,
    paddingLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: tokens.colors.neutral[300],
    marginVertical: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 24,
    backgroundColor: tokens.colors.neutral[50],
    borderTopWidth: 1,
    borderTopColor: tokens.colors.neutral[200],
    gap: 14,
  },
  warningText: {
    fontSize: 13,
    lineHeight: 18,
    color: tokens.colors.error[500],
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: tokens.colors.primary[500],
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.neutral[50],
  },
  cancelButtonText: {
    color: tokens.colors.primary[500],
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 2,
  },
});
