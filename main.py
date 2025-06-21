# # from flask import Flask, render_template, request, jsonify
# # import pandas as pd
# # from flask_cors import CORS

# # app = Flask(__name__, static_folder='static', template_folder='templates')
# # CORS(app)

# # @app.route('/')
# # def home():
# #     return render_template('Home.html')

# # @app.route('/report')
# # def report():
# #     return render_template('Report.html')

# # @app.route('/analyze', methods=['POST'])
# # def analyze():
# #     if 'file' not in request.files:
# #         return jsonify({"error": "No file uploaded"}), 400

# #     file = request.files['file']
# #     try:
# #         df = pd.read_csv(file)
# #         correlation_matrix = df.corr(numeric_only=True)
# #         return jsonify(correlation_matrix.to_dict())
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500

# # if __name__ == '__main__':
# #     app.run(debug=True)












# from flask import Flask, render_template, request, jsonify
# import pandas as pd
# from flask_cors import CORS

# app = Flask(__name__, static_folder='static', template_folder='templates')
# CORS(app)

# @app.route('/')
# def home():
#     return render_template('Home.html')

# @app.route('/report')
# def report():
#     return render_template('Report.html')

# @app.route('/table')
# def table():
#     return render_template('Table.html')

# @app.route('/analyze', methods=['POST'])
# def analyze():
#     if 'file' not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files['file']
#     try:
#         df = pd.read_csv(file)
#         correlation_matrix = df.corr(numeric_only=True)
#         return jsonify(correlation_matrix.to_dict())
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)









# from flask import Flask, request, jsonify, render_template
# import pandas as pd
# from flask_cors import CORS
# import io
# import matplotlib.pyplot as plt
# import seaborn as sns
# import os

# app = Flask(__name__, static_folder='static', template_folder='templates')
# CORS(app)

# @app.route('/')
# def home():
#     return render_template('Home.html')

# @app.route('/report')
# def report():
#     return render_template('Report.html')

# @app.route('/table')
# def table():
#     return render_template('Table.html')

# # file_content = file.read().decode("utf-8")
# # file.seek(0)  # Reset pointer for pd.read_csv
# # print("=== CSV Preview ===")
# # print(file_content[:500]) 

# @app.route('/analyze', methods=['POST'])
# def analyze():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     if 'file' in request.files:
#         uploaded_file = request.files['file']
#     try:
#         file_preview = uploaded_file.read().decode("utf-8")
#         uploaded_file.seek(0)  # Reset pointer for actual read in try block
#         print("=== CSV Preview ===")
#         print(file_preview[:300])  # Limit to 300 chars for safety
#     except Exception as preview_err:
#         print("Preview Read Error:", str(preview_err))

#     try:
#         df = pd.read_csv(file)
#         # print("=== DataFrame Head ===")
#         # print(df.head())

#         correlation_matrix = df.corr(numeric_only=True)
#         # print("=== Correlation Matrix ===")
#         # print(correlation_matrix)

#         image_path = os.path.join('static', 'correlation_matrix.png')
#         plt.figure(figsize=(10, 8))
#         sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f")
#         plt.title('Correlation Matrix Heatmap')
#         plt.tight_layout()
#         plt.savefig(image_path)
#         plt.close()
#         # Fallback: If correlation matrix is empty
#         if correlation_matrix.empty:
#             return jsonify({'error': 'No numeric data found for correlation analysis.'})

#         return jsonify(correlation_matrix.to_dict())
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)












# from flask import Flask, request, jsonify, render_template
# import pandas as pd
# from flask_cors import CORS
# import io
# import matplotlib.pyplot as plt
# import seaborn as sns
# import os

# app = Flask(__name__, static_folder='static', template_folder='templates')
# CORS(app)

# @app.route('/')
# def home():
#     return render_template('Home.html')

# @app.route('/report')
# def report():
#     return render_template('Report.html')

# @app.route('/table')
# def table():
#     return render_template('Table.html')

# @app.route('/analyze', methods=['POST'])
# def analyze():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     if 'file' in request.files:
#         uploaded_file = request.files['file']
#     # try:
#     #     file_preview = uploaded_file.read().decode("utf-8")
#     #     uploaded_file.seek(0)  # Reset pointer for actual read in try block
#     #     print("=== CSV Preview ===")
#     #     print(file_preview[:300])  # Limit to 300 chars for safety
#     # except Exception as preview_err:
#     #     print("Preview Read Error:", str(preview_err))

#     try:
#         df = pd.read_csv(file)

#         # ✅ ADD this block to ensure all numeric data is extracted
#         numeric_df = df.select_dtypes(include=['number'])
#         if numeric_df.empty:
#             plt.figure(figsize=(6, 4))
#             plt.text(0.5, 0.5, 'No Numeric Data Found', fontsize=18, ha='center', va='center')
#             plt.axis('off')
#             placeholder_path = os.path.join('static', 'correlation_matrix.png')
#             plt.savefig(placeholder_path)
#             plt.close()
#             return jsonify({'error': 'CSV contains no numeric columns for correlation analysis.'})

#         df = numeric_df  # Use only numeric data from here

#         correlation_matrix = df.corr(numeric_only=True)

#         image_path = os.path.join('static', 'correlation_matrix.png')

#         # ✅ ADD: Ensure correlation matrix has more than one column and non-zero correlation values
#         if correlation_matrix.shape[0] < 2 or correlation_matrix.isnull().all().all():
#             return jsonify({'error': 'Not enough numeric data to generate a correlation matrix image.'})

#         plt.figure(figsize=(10, 8))
#         sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f")
#         plt.title('Correlation Matrix Heatmap')
#         plt.tight_layout()
#         plt.savefig(image_path)
#         plt.close()

#         if correlation_matrix.empty:
#             return jsonify({'error': 'No numeric data found for correlation analysis.'})

#         return jsonify(correlation_matrix.to_dict())
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)










# from flask import Flask, request, jsonify, render_template, send_from_directory
# import pandas as pd
# from flask_cors import CORS
# import io
# import matplotlib.pyplot as plt
# import seaborn as sns
# import os

# app = Flask(__name__, static_folder='static', template_folder='templates')
# CORS(app)

# UPLOAD_FOLDER = 'uploads'
# CHART_FOLDER = os.path.join('static', 'charts')

# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
# os.makedirs(CHART_FOLDER, exist_ok=True)

# @app.route('/')
# def home():
#     return render_template('Home.html')

# @app.route('/report')
# def report():
#     return render_template('Report.html')

# @app.route('/table')
# def table():
#     return render_template('Table.html')

# @app.route('/analyze', methods=['POST'])
# def analyze():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'}), 400

#     file = request.files['file']
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400

#     filepath = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(filepath)

#     try:
#         df = pd.read_csv(filepath)

#         numeric_df = df.select_dtypes(include=['number'])
#         if numeric_df.empty:
#             plt.figure(figsize=(6, 4))
#             plt.text(0.5, 0.5, 'No Numeric Data Found', fontsize=18, ha='center', va='center')
#             plt.axis('off')
#             placeholder_path = os.path.join('static', 'correlation_matrix.png')
#             plt.savefig(placeholder_path)
#             plt.close()
#             return jsonify({'error': 'CSV contains no numeric columns for correlation analysis.'})

#         correlation_matrix = numeric_df.corr(numeric_only=True)
#         image_path = os.path.join('static', 'correlation_matrix.png')

#         if correlation_matrix.shape[0] < 2 or correlation_matrix.isnull().all().all():
#             return jsonify({'error': 'Not enough numeric data to generate a correlation matrix image.'})

#         plt.figure(figsize=(10, 8))
#         sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f")
#         plt.title('Correlation Matrix Heatmap')
#         plt.tight_layout()
#         plt.savefig(image_path)
#         plt.close()

#         return jsonify(correlation_matrix.to_dict())
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/generate_charts', methods=['POST'])
# def generate_charts():
#     data = request.get_json()
#     analytics = data.get('analytics')
#     algorithm = data.get('algorithm')

#     uploaded_files = os.listdir(UPLOAD_FOLDER)
#     if not uploaded_files:
#         return jsonify({'error': 'No data file uploaded'}), 400

#     filepath = os.path.join(UPLOAD_FOLDER, uploaded_files[-1])
#     df = pd.read_csv(filepath)

#     # categories = df.columns[1]
#     # values = df[df.columns[2]]

#     categorical_cols = df.select_dtypes(include=['object', 'category']).columns
#     numeric_cols = df.select_dtypes(include=['number']).columns

#     if len(categorical_cols) == 0 or len(numeric_cols) == 0:
#         return jsonify({'error': 'Need at least one categorical and one numerical column'}), 400

#     category_col = categorical_cols[0]
#     value_col = numeric_cols[0]

#     group_data = df.groupby(category_col)[value_col].sum()

#     # # Pie Chart
#     # plt.figure()
#     # df.groupby(categories)[values.name].sum().plot.pie(autopct='%1.1f%%')
#     # plt.title(f'{analytics} - {algorithm} - Pie Chart')
#     # plt.ylabel('')
#     # plt.savefig(os.path.join(CHART_FOLDER, 'pie.png'))
#     # plt.close()

#     # # Bar Chart
#     # plt.figure()
#     # df.groupby(categories)[values.name].sum().plot.bar()
#     # plt.title(f'{analytics} - {algorithm} - Bar Chart')
#     # plt.savefig(os.path.join(CHART_FOLDER, 'bar.png'))
#     # plt.close()

#     # # Area Chart
#     # plt.figure()
#     # df.groupby(categories)[values.name].sum().plot.area()
#     # plt.title(f'{analytics} - {algorithm} - Area Chart')
#     # plt.savefig(os.path.join(CHART_FOLDER, 'area.png'))
#     # plt.close()

#     # # Line Chart
#     # plt.figure()
#     # df.groupby(categories)[values.name].sum().plot.line()
#     # plt.title(f'{analytics} - {algorithm} - Line Chart')
#     # plt.savefig(os.path.join(CHART_FOLDER, 'line.png'))
#     # plt.close()

#     # # Donut Chart
#     # plt.figure()
#     # data_series = df.groupby(categories)[values.name].sum()
#     # wedges, texts = plt.pie(data_series, wedgeprops=dict(width=0.4), startangle=-40,
#     #                         labels=data_series.index, autopct='%1.1f%%')
#     # plt.title(f'{analytics} - {algorithm} - Donut Chart')
#     # plt.savefig(os.path.join(CHART_FOLDER, 'donut.png'))
#     # plt.close()

#     # return jsonify({'success': True})
#      # Pie Chart
#     plt.figure()
#     group_data.plot.pie(autopct='%1.1f%%')
#     plt.title(f'{analytics} - {algorithm} - Pie Chart')
#     plt.ylabel('')
#     plt.savefig(os.path.join(CHART_FOLDER, 'pie.png'))
#     plt.close()

#     # Bar Chart
#     plt.figure()
#     group_data.plot.bar(color='skyblue')
#     plt.title(f'{analytics} - {algorithm} - Bar Chart')
#     plt.ylabel(value_col)
#     plt.savefig(os.path.join(CHART_FOLDER, 'bar.png'))
#     plt.close()

#     # Area Chart
#     plt.figure()
#     group_data.plot.area()
#     plt.title(f'{analytics} - {algorithm} - Area Chart')
#     plt.ylabel(value_col)
#     plt.savefig(os.path.join(CHART_FOLDER, 'area.png'))
#     plt.close()

#     # Line Chart
#     plt.figure()
#     group_data.plot.line(marker='o')
#     plt.title(f'{analytics} - {algorithm} - Line Chart')
#     plt.ylabel(value_col)
#     plt.savefig(os.path.join(CHART_FOLDER, 'line.png'))
#     plt.close()

#     # Donut Chart
#     plt.figure()
#     wedges, texts, autotexts = plt.pie(group_data, labels=group_data.index,
#                                        autopct='%1.1f%%', wedgeprops=dict(width=0.4))
#     plt.title(f'{analytics} - {algorithm} - Donut Chart')
#     plt.savefig(os.path.join(CHART_FOLDER, 'donut.png'))
#     plt.close()

#     return jsonify({'success': True})

# if __name__ == '__main__':
#     app.run(debug=True)















from flask import Flask, request, jsonify, render_template, send_from_directory
import pandas as pd
from flask_cors import CORS
import io
import matplotlib.pyplot as plt
import seaborn as sns
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

UPLOAD_FOLDER = 'uploads'
CHART_FOLDER = os.path.join('static', 'charts')
HEATMAP_PATH = 'static/correlation_matrix.png'

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(CHART_FOLDER, exist_ok=True)

df_global = None  # Global variable to store uploaded DataFrame

# Home and other routes
@app.route('/')
def home():
    return render_template('Home.html')

@app.route('/open')
def open():
    return render_template('Open.html')

# @app.route('/drive')
# def open():
#     return render_template('Drive.html')

@app.route('/signin')
def signin():
    return render_template('Signin.html')

@app.route('/signup')
def signup():
    return render_template('Signup.html')

@app.route('/report')
def report():
    return render_template('Report.html')

@app.route('/table')
def table():
    return render_template('Table.html')


# Upload and analyze CSV for correlation matrix
@app.route('/analyze', methods=['POST'])
def analyze():
    global df_global
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        df = pd.read_csv(filepath)
        df_global = df.copy()  # Store for later chart use

        numeric_df = df.select_dtypes(include=['number'])
        if numeric_df.empty:
            plt.figure(figsize=(6, 4))
            plt.text(0.5, 0.5, 'No Numeric Data Found', fontsize=18, ha='center', va='center')
            plt.axis('off')
            plt.savefig(HEATMAP_PATH)
            plt.close()
            return jsonify({'error': 'CSV contains no numeric columns for correlation analysis.'})

        correlation_matrix = numeric_df.corr(numeric_only=True)

        if correlation_matrix.shape[0] < 2 or correlation_matrix.isnull().all().all():
            return jsonify({'error': 'Not enough numeric data to generate a correlation matrix image.'})

        plt.figure(figsize=(10, 8))
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f")
        plt.title('Correlation Matrix Heatmap')
        plt.tight_layout()
        plt.savefig(HEATMAP_PATH)
        plt.close()

        return jsonify(correlation_matrix.to_dict())

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Get headers for dynamic checkbox selection
@app.route('/headers', methods=['GET'])
def headers():
    global df_global
    if df_global is None:
        return jsonify([])
    return jsonify(list(df_global.columns))


# Generate charts using selected analytics type, algorithm, and columns
@app.route('/generate_charts', methods=['POST'])
def generate_charts():
    global df_global
    data = request.get_json()
    analytics = data.get('analytics')
    algorithm = data.get('algorithm')
    selected_columns = data.get('columns', [])

    if df_global is None:
        uploaded_files = os.listdir(UPLOAD_FOLDER)
        if not uploaded_files:
            return jsonify({'error': 'No data file uploaded'}), 400
        filepath = os.path.join(UPLOAD_FOLDER, uploaded_files[-1])
        df_global = pd.read_csv(filepath)

    try:
        df = df_global
        if selected_columns:
            if len(selected_columns) < 2:
                return jsonify({'error': 'Select at least two columns'}), 400
            col1, col2 = selected_columns[:2]
            x = df[col1]
            y = df[col2]
        else:
            categorical_cols = df.select_dtypes(include=['object', 'category']).columns
            numeric_cols = df.select_dtypes(include=['number']).columns
            if len(categorical_cols) == 0 or len(numeric_cols) == 0:
                return jsonify({'error': 'Need at least one categorical and one numerical column'}), 400
            col1, col2 = categorical_cols[0], numeric_cols[0]
            x = df[col1]
            y = df[col2]

        group_data = df.groupby(col1)[col2].sum().nlargest(5)

        # Pie Chart
        plt.figure()
        group_data.plot.pie(autopct='%1.1f%%')
        # plt.title(f'{analytics} - {algorithm} - Pie Chart')
        plt.title(f'Pie Chart')
        plt.ylabel('')
        plt.savefig(os.path.join(CHART_FOLDER, 'pie.png'))
        plt.close()

        # Bar Chart
        plt.figure()
        group_data.plot.bar(color='skyblue')
        plt.title(f'{analytics} - {algorithm} - Bar Chart')
        plt.ylabel(col2)
        plt.savefig(os.path.join(CHART_FOLDER, 'bar.png'))
        plt.close()

        # # Area Chart
        # plt.figure()
        # group_data.plot.area()
        # plt.title(f'{analytics} - {algorithm} - Area Chart')
        # plt.ylabel(col2)
        # plt.savefig(os.path.join(CHART_FOLDER, 'area.png'))
        # plt.close()

        # # Line Chart
        # plt.figure()
        # group_data.plot.line(marker='o')
        # plt.title(f'{analytics} - {algorithm} - Line Chart')
        # plt.ylabel(col2)
        # plt.savefig(os.path.join(CHART_FOLDER, 'line.png'))
        # plt.close()

        # Donut Chart
        plt.figure()
        wedges, texts, autotexts = plt.pie(group_data, labels=group_data.index,
                                           autopct='%1.1f%%', wedgeprops=dict(width=0.4))
        plt.title(f'{analytics} - {algorithm} - Donut Chart')
        plt.savefig(os.path.join(CHART_FOLDER, 'donut.png'))
        plt.close()

        return jsonify({'success': True})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Serve static files (charts/images)
@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(debug=True)
