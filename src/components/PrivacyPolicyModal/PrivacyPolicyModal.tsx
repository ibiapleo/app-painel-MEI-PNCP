import { useMemo } from 'react';
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

import { useTheme } from '@/hooks/useTheme';

interface PrivacyPolicyModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ visible, onClose }: PrivacyPolicyModalProps) {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
          backgroundColor: theme.colors.background.surface,
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
          backgroundColor: theme.colors.background.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border.subtle,
        },
        headerTitle: {
          flex: 1,
          fontSize: 18,
          fontWeight: '700',
          color: theme.colors.text.primary,
          marginRight: 12,
        },
        closeButton: {
          width: 36,
          height: 36,
          borderRadius: 18,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background.muted,
        },
        scrollContainer: {
          flex: 1,
          backgroundColor: theme.colors.background.surface,
        },
        scrollContent: {
          paddingHorizontal: 20,
          paddingVertical: 20,
          paddingBottom: 40,
        },
        sectionTitle: {
          fontSize: 17,
          fontWeight: '700',
          color: theme.colors.text.primary,
          marginTop: 20,
          marginBottom: 10,
        },
        paragraph: {
          fontSize: 14,
          lineHeight: 21,
          color: theme.colors.text.secondary,
          marginBottom: 14,
        },
        listItem: {
          fontSize: 14,
          lineHeight: 21,
          color: theme.colors.text.secondary,
          marginBottom: 8,
          paddingLeft: 4,
        },
        footer: {
          padding: 20,
          paddingBottom: 24,
          backgroundColor: theme.colors.background.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.subtle,
        },
        closeButtonBottom: {
          height: 50,
          backgroundColor: theme.colors.primary.main,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        closeButtonText: {
          color: theme.colors.text.onPrimary,
          fontSize: 16,
          fontWeight: '600',
        },
      }),
    [theme],
  );

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Política de Privacidade</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={22} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.scrollContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
            >
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
              <TouchableOpacity style={styles.closeButtonBottom} onPress={onClose}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
